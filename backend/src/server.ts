import Fastify, { FastifyServerOptions, type FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
  jsonSchemaTransform,
} from 'fastify-type-provider-zod'

import { ENV } from './utils/env'
import { sessionPlugin, authenticationRequiredPlugin } from './utils/auth'
import courseRoutes from './modules/course/routes'
import { signInRoute, signOutRoute, signUpRoute } from './modules/auth/routes'
import scoreCardRoutes from './modules/score-card/routes'
import { readFile } from 'fs/promises'
import { resolve } from 'path'

const options: FastifyServerOptions = {
  logger: { level: 'info' },
}

if (ENV.NODE_ENV === 'development' && process.stdout.isTTY) {
  options.logger = { level: 'trace', transport: { target: 'pino-pretty' } }
}

const server = Fastify(options).withTypeProvider<ZodTypeProvider>()

function initServer() {
  server.setValidatorCompiler(validatorCompiler)
  server.setSerializerCompiler(serializerCompiler)

  server.register(sessionPlugin)

  if (ENV.NODE_ENV === 'development') {
    server.register(fp(developmentContext))
  }

  server.register(publicContext)
  server.register(authenticatedContext)

  return server
}

/**
 * This context wraps all logic that should be public.
 */
async function publicContext(server: FastifyInstance) {
  server.get('/healthcheck', async () => ({ status: 'OK' }))
  server.register(signUpRoute, { prefix: 'api/auth' })
  server.register(signInRoute, { prefix: 'api/auth' })
}

/**
 * This context wraps all logic that requires authentication.
 */
async function authenticatedContext(server: FastifyInstance) {
  server.register(authenticationRequiredPlugin)

  server.register(courseRoutes, { prefix: 'api/courses' })
  server.register(scoreCardRoutes, { prefix: 'api/score-card' })
  server.register(signOutRoute, { prefix: 'api/auth' })
}

/**
 * This context wraps all logic that should only be available during development
 */
async function developmentContext(server: FastifyInstance) {
  const fastifySwagger = await import('@fastify/swagger')
  const fastifySwaggerUI = await import('@fastify/swagger-ui')

  const swaggerUITitle = 'Discgolf stats Open API'

  const darkTheme = await readFile(resolve('static/SwaggerDark.css'), {
    encoding: 'utf-8',
  })

  server.register(fastifySwagger, {
    openapi: {
      info: {
        title: swaggerUITitle,
        description: 'API docs for discgolf stats',
        version: '0.0.1',
      },
      tags: [
        {
          name: 'course',
          description: 'Information about a specific disc golf course',
        },
        { name: 'player', description: 'Profile information about the player' },
        {
          name: 'score-card',
          description:
            'Combined results for multiple players who played a round together',
        },
        {
          name: 'auth',
          description: 'Authentication and user account',
        },
      ],
    },
    transform: jsonSchemaTransform,
  })

  server.register(fastifySwaggerUI, {
    routePrefix: `/${ENV.OPENAPI_PREFIX}`,
    logLevel: 'silent',
    theme: {
      title: swaggerUITitle,
      css: [{ filename: 'SwaggerDark.css', content: darkTheme }],
    },
  })
}

export default initServer

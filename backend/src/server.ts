import Fastify, { type FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
  jsonSchemaTransform,
} from 'fastify-type-provider-zod'

import { ENV } from './utils/env'
import { authPlugin } from './utils/auth'
import courseRoutes from './modules/course/routes'
import { signInRoute, signOutRoute, signUpRoute } from './modules/auth/routes'

const server = Fastify({
  logger: { level: 'info' },
}).withTypeProvider<ZodTypeProvider>()

function initServer() {
  server.setValidatorCompiler(validatorCompiler)
  server.setSerializerCompiler(serializerCompiler)

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
  server.register(signInRoute, { prefix: 'api/auth' })
  server.register(signUpRoute, { prefix: 'api/auth' })
}

/**
 * This context wraps all logic that requires authentication.
 */
async function authenticatedContext(server: FastifyInstance) {
  server.register(authPlugin)

  server.register(courseRoutes, { prefix: 'api/courses' })
  server.register(signOutRoute, { prefix: 'api/auth' })
}

/**
 * This context wraps all logic that should only be available during development
 */
async function developmentContext(server: FastifyInstance) {
  const fastifySwagger = await import('@fastify/swagger')
  const fastifySwaggerUI = await import('@fastify/swagger-ui')

  server.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Discgolf stats Open API',
        description: 'API docs for discgolf stats',
        version: '0.0.1',
      },
      tags: [
        { name: 'course', description: 'Course-related endpoints' },
        { name: 'player', description: 'Player-related endpoints' },
        {
          name: 'authentication',
          description: 'Authentication-related endpoints',
        },
      ],
    },
    transform: jsonSchemaTransform,
  })

  server.register(fastifySwaggerUI, {
    routePrefix: `/${ENV.OPENAPI_PREFIX}`,
  })
}

export default initServer

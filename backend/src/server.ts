import Fastify, { type FastifyInstance } from 'fastify'
import fastifyCookie from '@fastify/cookie'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
  jsonSchemaTransform,
} from 'fastify-type-provider-zod'

import { ENV } from './utils/env'
import { authPlugin } from './utils/auth'
import courseRoutes from './modules/course/routes'

export const server = Fastify({
  logger: { level: 'info' },
}).withTypeProvider<ZodTypeProvider>()

function initServer() {
  server.setValidatorCompiler(validatorCompiler)
  server.setSerializerCompiler(serializerCompiler)

  // NOTE: Maybe we can remove the fastifyCookie plugin since Lucia already handles this
  // server.register(fastifyCookie)

  // TODO: Only include Swagger in development
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
      ],
    },
    transform: jsonSchemaTransform,
  })

  server.register(fastifySwaggerUI, {
    routePrefix: `/${ENV.OPENAPI_PREFIX}`,
  })

  server.register(publicContext)
  server.register(authenticatedContext)

  return server
}

/**
 * This context wraps all logic that should be public.
 */
async function publicContext(server: FastifyInstance) {
  server.get('/healthcheck', async function () {
    return { status: 'OK' }
  })
}

/**
 * This context wraps all logic that requires authentication.
 */
async function authenticatedContext(server: FastifyInstance) {
  server.register(authPlugin)

  server.register(courseRoutes, { prefix: 'api/courses' })
}

export default initServer

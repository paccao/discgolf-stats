import Fastify from 'fastify'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
  jsonSchemaTransform,
} from 'fastify-type-provider-zod'

import prismaPlugin from './utils/prismaPlugin'
import courseRoutes from './modules/course/routes'

export const server = Fastify({
  logger: { level: 'info' },
}).withTypeProvider<ZodTypeProvider>()

const OPENAPI_PREFIX = process.env.OPENAPI_PREFIX || 'api/docs'

function initServer() {
  server.setValidatorCompiler(validatorCompiler)
  server.setSerializerCompiler(serializerCompiler)

  server.register(prismaPlugin)

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
    routePrefix: `/${OPENAPI_PREFIX}`,
  })

  // register routes
  server.register(courseRoutes, { prefix: 'api/courses' })

  server.get('/healthcheck', async function () {
    return { status: 'OK' }
  })

  return server
}

export default initServer

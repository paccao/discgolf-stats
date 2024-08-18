import Fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'

import prismaPlugin from './utils/prismaPlugin'

import courseRoutes from './modules/course/routes'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import {
  fastifyZodOpenApiPlugin,
  fastifyZodOpenApiTransform,
  fastifyZodOpenApiTransformObject,
} from 'fastify-zod-openapi'

export const server = Fastify({
  logger: { level: 'info' },
}).withTypeProvider<ZodTypeProvider>()

const OPENAPI_PREFIX = process.env.OPENAPI_PREFIX || 'api/docs'
const openapiVersion = '3.0.3'

function initServer() {
  server.setValidatorCompiler(validatorCompiler)
  server.setSerializerCompiler(serializerCompiler)

  server.register(prismaPlugin)

  // register openapi
  server.register(fastifyZodOpenApiPlugin, { openapi: openapiVersion })
  server.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Discgolf stats Openapi',
        description: 'API docs for discgolf stats',
        version: '0.0.1',
      },
      tags: [
        { name: 'course', description: 'Course related end-points' },
        { name: 'player', description: 'Player related end-points' },
      ],
      openapi: openapiVersion,
    },
    transform: fastifyZodOpenApiTransform,
    transformObject: fastifyZodOpenApiTransformObject,
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

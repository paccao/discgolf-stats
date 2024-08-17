import Fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'

import prismaPlugin from './utils/prismaPlugin'

import courseRoutes from './modules/course/routes'

export const server = Fastify({
  logger: { level: 'info' },
}).withTypeProvider<ZodTypeProvider>()

function initServer() {
  server.setValidatorCompiler(validatorCompiler)
  server.setSerializerCompiler(serializerCompiler)

  server.register(prismaPlugin)

  // register zod schemas
  //   for (const schema of [...]) {}

  // register openapi

  // register routes
  server.register(courseRoutes, { prefix: 'api/courses' })

  server.get('/healthcheck', async function () {
    return { status: 'OK' }
  })

  return server
}

export default initServer

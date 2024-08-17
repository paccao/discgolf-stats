import Fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'

import courseRoutes from './modules/course/routes'

export const server = Fastify({
  logger: { level: 'info' },
}).withTypeProvider<ZodTypeProvider>()

function buildServer() {
  server.setValidatorCompiler(validatorCompiler)
  server.setSerializerCompiler(serializerCompiler)

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

export default buildServer

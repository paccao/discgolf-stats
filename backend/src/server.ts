import Fastify from 'fastify'
import fastifyCookie from '@fastify/cookie'
import fastifySession from '@fastify/session'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
  jsonSchemaTransform,
} from 'fastify-type-provider-zod'

import { ENV } from './utils/env'
import SessionStore from './utils/SessionStore'
import courseRoutes from './modules/course/routes'

export const server = Fastify({
  logger: { level: 'info' },
}).withTypeProvider<ZodTypeProvider>()

const ONE_DAY_MS = 8.64e7

function initServer() {
  server.setValidatorCompiler(validatorCompiler)
  server.setSerializerCompiler(serializerCompiler)

  server.register(fastifyCookie)
  server.register(fastifySession, {
    cookieName: 'sessionId',
    secret: ENV.SESSION_SECRET,
    cookie: {
      maxAge: ONE_DAY_MS,
      secure: 'auto',
      httpOnly: true,
      sameSite: 'lax',
    },
    store: new SessionStore(),
  })

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

  // register routes
  server.register(courseRoutes, { prefix: 'api/courses' })

  server.get('/healthcheck', async function () {
    return { status: 'OK' }
  })

  return server
}

export default initServer

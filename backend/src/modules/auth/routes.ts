import { FastifyInstance } from 'fastify'
import { loginHandler, logoutHandler } from './controller'
import { AuthResponseSchema } from './schema'
import { LoginInputSchema } from './schema'

export async function loginRoute(server: FastifyInstance) {
  server.post(
    '/login',
    {
      schema: {
        body: LoginInputSchema,
        response: {
          200: AuthResponseSchema,
        },
      },
    },
    loginHandler,
  )
}


import { FastifyInstance } from 'fastify'
import { loginHandler, logoutHandler, signUpHandler } from './controller'
import { AuthResponseSchema } from './schema'
import { LoginInputSchema, SignUpInputSchema } from './schema'

export async function loginRoute(server: FastifyInstance) {
  server.post(
    '/login',
    {
      schema: {
        body: LoginInputSchema,
        response: {
          // IDEA: Maybe send
          200: AuthResponseSchema,
        },
      },
    },
    loginHandler,
  )
}

export async function signUpRoute(server: FastifyInstance) {
  server.post(
    '/signup',
    {
      schema: {
        body: SignUpInputSchema,
        response: {
          200: AuthResponseSchema,
        },
      },
    },
    signUpHandler,
  )
}

export async function logoutRoute(server: FastifyInstance) {
  server.post(
    '/logout',
    {
      schema: {
        response: {
          200: AuthResponseSchema,
        },
      },
    },
    logoutHandler,
  )
}

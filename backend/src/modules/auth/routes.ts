import { FastifyInstance } from 'fastify'
import { signInHandler, signOutHandler, signUpHandler } from './controller'
import { AuthResponseSchema } from './schema'
import { signInInputSchema, SignUpInputSchema } from './schema'

export async function signInRoute(server: FastifyInstance) {
  server.post(
    '/signIn',
    {
      schema: {
        body: signInInputSchema,
        response: {
          // IDEA: Maybe send
          200: AuthResponseSchema,
        },
      },
    },
    signInHandler,
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

export async function signOutRoute(server: FastifyInstance) {
  server.post(
    '/signOut',
    {
      schema: {
        response: {
          200: AuthResponseSchema,
        },
      },
    },
    signOutHandler,
  )
}

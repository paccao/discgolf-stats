import { FastifyInstance } from 'fastify'
import { signInHandler, signOutHandler, signUpHandler } from './controller'
import { AuthResponseSchema } from './schema'
import { SignInInputSchema, SignUpInputSchema } from './schema'

export async function signInRoute(server: FastifyInstance) {
  server.post(
    '/sign-in',
    {
      schema: {
        body: SignInInputSchema,
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
    '/sign-up',
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
    '/sign-out',
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

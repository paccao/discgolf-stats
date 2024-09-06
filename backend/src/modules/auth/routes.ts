import { FastifyInstance } from 'fastify'
import { signInHandler, signOutHandler, signUpHandler } from './controller'
import { AuthResponseSchema } from './schema'
import { SignInInputSchema, SignUpInputSchema } from './schema'

const tags = ['auth']

export async function signUpRoute(server: FastifyInstance) {
  server.post(
    '/sign-up',
    {
      schema: {
        tags,
        body: SignUpInputSchema,
        response: {
          200: AuthResponseSchema,
        },
      },
    },
    signUpHandler,
  )
}

export async function signInRoute(server: FastifyInstance) {
  server.post(
    '/sign-in',
    {
      schema: {
        tags,
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

export async function signOutRoute(server: FastifyInstance) {
  server.post(
    '/sign-out',
    {
      schema: {
        tags,
        response: {
          200: AuthResponseSchema,
        },
      },
    },
    signOutHandler,
  )
}

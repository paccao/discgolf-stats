import { FastifyInstance } from 'fastify'
import { signInHandler, signOutHandler, signUpHandler } from './controller'
import {
  SignInInputSchema,
  SignUpInputSchema,
  AuthResponseSchema,
} from './schema'
import { getErrorSchemas } from '@/utils/schema'

const tags = ['auth']

export async function publicAuthRoutes(server: FastifyInstance) {
  server.post(
    '/sign-up',
    {
      schema: {
        tags,
        body: SignUpInputSchema,
        response: {
          200: AuthResponseSchema,
          ...getErrorSchemas(400, 500),
        },
      },
    },
    signUpHandler,
  )

  server.post(
    '/sign-in',
    {
      schema: {
        tags,
        body: SignInInputSchema,
        response: {
          200: AuthResponseSchema,
          ...getErrorSchemas(400, 401, 500),
        },
      },
    },
    signInHandler,
  )
}

export async function authRoutes(server: FastifyInstance) {
  server.post(
    '/sign-out',
    {
      schema: {
        tags,
        response: {
          200: AuthResponseSchema,
          ...getErrorSchemas(401, 500),
        },
      },
    },
    signOutHandler,
  )
}

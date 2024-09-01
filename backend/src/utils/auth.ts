import { Lucia } from 'lucia'
import { PrismaAdapter } from '@lucia-auth/adapter-prisma'
import { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'

import { User } from '../../prisma/generated/zod'
import prisma from './prisma'
import { ENV } from './env'

const adapter = new PrismaAdapter(prisma.session, prisma.user)

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: ENV.NODE_ENV === 'production',
      sameSite: 'lax',
    },
  },
  /** Expose additional user attributes later in the request handling */
  getUserAttributes: (attributes) => {
    return {
      userId: attributes.id,
    }
  },
})

// Override the lucia module type with our config above
declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia
    DatabaseUserAttributes: DatabaseUserAttributes
    UserId: User['id']
  }
}

interface DatabaseUserAttributes {
  id: string
}

declare module 'fastify' {
  export interface FastifyRequest {
    user?: Pick<User, 'id'>
  }
}

/**
 * Automatically set the signed in user based on the session cookie.
 */
export const sessionPlugin: FastifyPluginAsync = fp(async (server) => {
  server.addHook('onRequest', async (request, reply) => {
    const sessionId = lucia.readSessionCookie(request.headers.cookie ?? '')
    if (!sessionId) return

    const { session, user } = await lucia.validateSession(sessionId)
    if (session) {
      request.user = user

      if (session.fresh) {
        reply.header(
          'Set-Cookie',
          lucia.createSessionCookie(session.id).serialize(),
        )
      }
    }
  })
})

/**
 * Plugin to ensure the user is authenticated. All routes registered after this plugin will require authentication.
 */
export const authenticationRequiredPlugin: FastifyPluginAsync = fp(
  async (server) => {
    // TODO: Fix bug that freezes requests that have no session here
    server.addHook('onRequest', async (request, reply) => {
      if (!request.user) {
        return reply.code(401)
      }
    })
  },
)

import { Lucia } from 'lucia'
import { PrismaAdapter } from '@lucia-auth/adapter-prisma'
import {
  FastifyPluginAsync,
  FastifyReply,
  FastifyRequest,
  HookHandlerDoneFunction,
} from 'fastify'
import fp from 'fastify-plugin'
import fastifyAuth from '@fastify/auth'

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

export const authPlugin: FastifyPluginAsync = fp(async (server, options) => {
  server.addHook('onRequest', async (request, reply) => {
    const sessionId = lucia.readSessionCookie(request.headers.cookie ?? '')

    if (!sessionId) {
      // TODO: fix redirect in frontend
      return reply.code(401).send()
    }

    const { session, user } = await lucia.validateSession(sessionId)
    if (session) {
      request.user = user

      if (session.fresh) {
        reply.header(
          'Set-Cookie',
          lucia.createSessionCookie(session.id).serialize(),
        )
      }
    } else {
      return reply.code(401).send()
    }
  })
})

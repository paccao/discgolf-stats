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
    user?: Omit<User, 'hashedPassword'>
  }
}

export const authPlugin: FastifyPluginAsync = fp(async (server, options) => {
  server.addHook('onRequest', async (request, reply) => {
    const sessionId = lucia.readSessionCookie(request.headers.cookie ?? '')

    if (!sessionId) {
      // TODO: fix redirect
      return reply.redirect('/auth/signIn', 401)
    }

    const { session, user } = await lucia.validateSession(sessionId)
    if (session && session.fresh) {
      reply.header(
        'Set-Cookie',
        lucia.createSessionCookie(session.id).serialize(),
      )

      request.user = user
    }
  })

  // IDEA: Maybe use this for validation and route authorization checks
  // for example, admin vs basic user permissions.
  // server
  //   .decorate(
  //     'verifySession',
  //     async (
  //       request: FastifyRequest,
  //       reply: FastifyReply,
  //       done: HookHandlerDoneFunction,
  //     ) => {
  //       const sessionId = lucia.readSessionCookie(request.headers.cookie ?? '')

  //       if (!sessionId) {
  //         return reply.redirect('/auth/signIn', 401)
  //       }

  //       const { session, user } = await lucia.validateSession(sessionId)
  //       if (session && session.fresh) {
  //         reply.header(
  //           'Set-Cookie',
  //           lucia.createSessionCookie(session.id).serialize(),
  //         )

  //         request.user = user
  //         request.session = session
  //       }

  //       done() // pass an error if the authentication fails
  //     },
  //   )
  //   .register(fastifyAuth)
  //   .after(() => {
  //     server.route({
  //       method: 'POST',
  //       url: '/auth',
  //       preHandler: server.auth([server.verifySession]),
  //       handler: (req, reply) => {
  //         req.log.info('Auth route')
  //         reply.send({ hello: 'world' })
  //       },
  //     })
  //   })
})

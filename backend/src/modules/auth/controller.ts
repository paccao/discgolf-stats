import { FastifyReply, FastifyRequest } from 'fastify'

import { SignInInput, SignUpInput } from './schema'
import { signInUser, signOutUser, signUpUser } from './service'
import { lucia } from '@/utils/auth'

export async function signUpHandler(
  request: FastifyRequest<{ Body: SignUpInput }>,
  reply: FastifyReply,
) {
  if (request.user) return reply.code(400)

  const { username, password } = request.body
  try {
    const { sessionCookie, error, status } = await signUpUser(
      username,
      password,
    )
    if (!sessionCookie) {
      return reply.code(status).send(error)
    }

    reply.header('Set-Cookie', sessionCookie.serialize())
  } catch (e: any) {
    request.log.error(e, e?.message)
    reply.code(500)
  }
}

export async function signInHandler(
  request: FastifyRequest<{ Body: SignInInput }>,
  reply: FastifyReply,
) {
  if (request.user) return reply.code(400)

  const { username, password } = request.body

  try {
    const { sessionCookie, error, status } = await signInUser(
      username,
      password,
    )
    if (!sessionCookie) {
      return reply.code(status).send(error)
    }

    reply.header('Set-Cookie', sessionCookie.serialize())
  } catch (e: any) {
    request.log.error(e, e?.message)
    reply.code(500)
  }
}

export async function signOutHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const sessionId = lucia.readSessionCookie(request.headers.cookie ?? '')
  if (!sessionId) {
    return reply.code(401)
  }

  try {
    const sessionCookie = await signOutUser(sessionId)
    reply.header('Set-Cookie', sessionCookie.serialize())
  } catch (e: any) {
    request.log.error(e, e?.message)
    reply.code(500)
  }
}

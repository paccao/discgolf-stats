import { FastifyReply, FastifyRequest } from 'fastify'

import { SignInInput, SignUpInput } from './schema'
import { signInUser, signOutUser, signUpUser } from './service'
import { lucia } from '@/utils/auth'
import { BadRequest, InternalServerError } from '@/utils/errors'

export async function signUpHandler(
  request: FastifyRequest<{ Body: SignUpInput }>,
  reply: FastifyReply,
) {
  if (request.user) throw new BadRequest('You are already signed in')

  const { username, password } = request.body
  const { sessionCookie } = await signUpUser(username, password)

  reply.header('Set-Cookie', sessionCookie.serialize())
}

export async function signInHandler(
  request: FastifyRequest<{ Body: SignInInput }>,
  reply: FastifyReply,
) {
  if (request.user) throw new BadRequest('You are already signed in')

  const { username, password } = request.body

  const { sessionCookie } = await signInUser(username, password)

  reply.header('Set-Cookie', sessionCookie.serialize())
}

export async function signOutHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const sessionId = lucia.readSessionCookie(request.headers.cookie ?? '')
  if (!sessionId) {
    return reply.code(401).send()
  }

  const sessionCookie = await signOutUser(sessionId)
  if (!sessionCookie) {
    throw new InternalServerError('Unexpected error while signing out')
  }

  reply.header('Set-Cookie', sessionCookie.serialize())
}

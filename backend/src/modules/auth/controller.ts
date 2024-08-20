import { FastifyReply, FastifyRequest } from 'fastify'

import { SignInInput, SignUpInput } from './schema'
import { signInUser, signOutUser, signUpUser } from './service'
import { lucia } from '../../utils/auth'

export async function signUpHandler(
  request: FastifyRequest<{ Body: SignUpInput }>,
  reply: FastifyReply,
) {
  const { username, password } = request.body
  try {
    const sessionCookie = await signUpUser(username, password)
    reply.header('Set-Cookie', sessionCookie.serialize())
  } catch (e: any) {
    console.error(e, username)
    reply.send(e?.message)
  }
}

export async function signInHandler(
  request: FastifyRequest<{ Body: SignInInput }>,
  reply: FastifyReply,
) {
  const { username, password } = request.body

  try {
    const sessionCookie = await signInUser(username, password)
    reply.header('Set-Cookie', sessionCookie.serialize())
  } catch (e: any) {
    console.error(e, username)
    reply.send(e?.message)
  }
}

export async function signOutHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const sessionId = lucia.readSessionCookie(request.headers.cookie ?? '')
  if (!sessionId) {
    throw new Error('Client has no session')
  }

  try {
    const sessionCookie = await signOutUser(sessionId)
    reply.header('Set-Cookie', sessionCookie.serialize())
  } catch (e: any) {
    console.error(e)
    reply.send(e?.message)
  }
}

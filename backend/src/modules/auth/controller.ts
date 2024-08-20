import { FastifyReply, FastifyRequest } from 'fastify'

import { signInInput, SignUpInput } from './schema'
import { signInUser, signUpUser } from './service'

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
  request: FastifyRequest<{ Body: signInInput }>,
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
) {}

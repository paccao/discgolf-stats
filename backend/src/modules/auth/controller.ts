import { FastifyReply, FastifyRequest } from 'fastify'

import { LoginInput, SignUpInput } from './schema'
import { loginUser, signUpUser } from './service'

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

export async function loginHandler(
  request: FastifyRequest<{ Body: LoginInput }>,
  reply: FastifyReply,
) {
  const { username, password } = request.body

  try {
    const sessionCookie = await loginUser(username, password)
    reply.header('Set-Cookie', sessionCookie.serialize())
  } catch (e: any) {
    console.error(e, username)
    reply.send(e?.message)
  }
}

export async function logoutHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {}

import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'

import { lucia } from '../../utils/auth'
import { LoginInput, SignUpInput } from './schema'
import { loginUser, signUpUser } from './service'

export async function signUpHandler(
  request: FastifyRequest<{ Body: SignUpInput }>,
  reply: FastifyReply,
) {
  const { username, password } = request.body
  try {
    const user = await signUpUser(username, password)
    // IDEA: Maybe also create a session for the user and log them in automatically?
  } catch (e) {
    // TODO: error handling
    // handle error: username already taken
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
    console.log()
  } catch (e: any) {
    console.error(e, username)
    reply.send(e?.message)
  }
}

export async function logoutHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {}

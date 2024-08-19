import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'

import { lucia } from '../../utils/auth'
import { LoginInput } from './schema'
import { loginUser } from './service'

export async function loginHandler(
  request: FastifyRequest<{
    Body: LoginInput
  }>,
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


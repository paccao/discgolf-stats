import { z } from 'zod'
import { verify } from '@node-rs/argon2'

import { Session } from '../../../prisma/generated/zod'
import prisma from '../../utils/prisma'
import { lucia } from '../../utils/auth'

export async function loginUser(username: string, password: string) {
  const existingUser = await prisma.user.findUnique({
    where: { username },
  })
  if (!existingUser) {
    throw new Error('Invalid username or password')
  }

  const isValidPassword = await verify(existingUser.hashedPassword, password, {
    // OWASP recommendations https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  })
  if (!isValidPassword) {
    throw new Error('Invalid username or password')
  }

  const session = await lucia.createSession(existingUser.id, {
    playerId: existingUser.playerId,
  })
  return lucia.createSessionCookie(session.id)
}

export function signUpUser(username: string, password: string) {}

export function logoutUser(id: Session['id']) {
  return prisma.session.findFirst({
    where: { id },
  })
}

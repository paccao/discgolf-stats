import { hash, verify } from '@node-rs/argon2'

import prisma from '@/utils/prisma'
import { lucia } from '@/utils/auth'

const hashConfig = {
  // OWASP recommendations https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
}

export async function signUpUser(username: string, password: string) {
  const existingUser = await prisma.user.findUnique({
    where: { username },
  })
  if (existingUser?.username == username) {
    return { error: 'Username already taken', status: 422 }
  }

  const hashedPassword = await hash(password, hashConfig)

  const newUser = await prisma.user.create({
    data: { username, hashedPassword },
    select: { id: true },
  })

  const session = await lucia.createSession(newUser.id, {})
  return { sessionCookie: lucia.createSessionCookie(session.id) }
}

export async function signInUser(username: string, password: string) {
  const existingUser = await prisma.user.findUnique({
    where: { username },
  })
  if (!existingUser) {
    return { error: 'Invalid username or password', status: 422 }
  }

  const isValidPassword = await verify(
    existingUser.hashedPassword,
    password,
    hashConfig,
  )
  if (!isValidPassword) {
    return { error: 'Invalid username or password', status: 422 }
  }

  // TODO: Check if a valid session exists before creating a new one

  const session = await lucia.createSession(existingUser.id, {})
  return { sessionCookie: lucia.createSessionCookie(session.id) }
}

export async function signOutUser(sessionId: string) {
  await lucia.invalidateSession(sessionId)

  return lucia.createBlankSessionCookie()
}

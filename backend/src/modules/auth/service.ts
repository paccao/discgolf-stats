import { hash, verify } from '@node-rs/argon2'

import { Session } from '../../../prisma/generated/zod'
import prisma from '../../utils/prisma'
import { lucia } from '../../utils/auth'

const hashConfig = {
  // OWASP recommendations https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
}

export async function signInUser(username: string, password: string) {
  const existingUser = await prisma.user.findUnique({
    where: { username },
  })
  if (!existingUser) {
    throw new Error('Invalid username or password')
  }

  const isValidPassword = await verify(
    existingUser.hashedPassword,
    password,
    hashConfig,
  )
  if (!isValidPassword) {
    throw new Error('Invalid username or password')
  }

  // TODO: Check if a valid session exists before creating a new one

  const session = await lucia.createSession(existingUser.id, {})
  console.log('session object: ', session)

  return lucia.createSessionCookie(session.id)
}

export async function signUpUser(username: string, password: string) {
  const existingUser = await prisma.user.findUnique({
    where: { username },
  })
  console.log(existingUser)
  if (existingUser?.username == username) {
    throw new Error('Username already taken')
  }

  const passwordHash = await hash(password, hashConfig)

  await prisma.user.create({
    data: { username, hashedPassword: passwordHash },
  })

  const newUser = await prisma.user.findUnique({
    where: { username },
  })
  if (!newUser) {
    await prisma.user.delete({
      where: { username },
    })
    throw new Error('Unexpected error when creating the user')
  }

  const session = await lucia.createSession(newUser.id, {})
  console.log('session object: ', session)

  return lucia.createSessionCookie(session.id)
}

export function signOutUser(id: Session['id']) {
  return prisma.session.findFirst({
    where: { id },
  })
}

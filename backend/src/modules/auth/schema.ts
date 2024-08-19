import { z } from 'zod'

// NOTE: Maybe improve this response type
export const AuthResponseSchema = z.object({
  msg: z.string().default('Request successful.'),
})

const usernameRegex = /^[0-9A-Za-z\._]{6,20}$/
const username = z.string().min(6).max(20).regex(usernameRegex)
const password = z.string().min(6).max(80)

export const LoginInputSchema = z.object({
  username,
  password,
})
export type LoginInput = z.infer<typeof LoginInputSchema>

export const SignUpInputSchema = z.object({
  username,
  password,
  // TODO: repeat password - maybe add only in the client
})
export type SignUpInput = z.infer<typeof SignUpInputSchema>

import { z } from 'zod'

export const AuthResponseSchema = z.object({
  msg: z.string().default('Request successful.'),
})

export const LoginInputSchema = z.object({
  username: z.string().min(1).max(40),
  password: z.string().min(6).max(80),
})
export type LoginInput = z.infer<typeof LoginInputSchema>

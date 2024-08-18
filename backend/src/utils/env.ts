import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().int().min(1).default(8080),
  DATABASE_URL: z.string().default('file:./dev.db'),
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  SESSION_SECRET: z.string().min(32),
  OPENAPI_PREFIX: z.string().min(1).default('api/docs'),
})

export const ENV = envSchema.parse(process.env)

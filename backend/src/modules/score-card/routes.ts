import { FastifyInstance } from 'fastify'

import { createScoreCardHandler, getScoreCardHandler } from './controller'
import { ScoreCardSchema } from '@/prisma/generated/zod'
import { CreateScoreCardInputSchema, GetScoreCardInputSchema } from './schema'
import { getErrorSchemas } from '@/utils/schema'

const tags = ['score-card']

export default async function scoreCardRoutes(server: FastifyInstance) {
  server.get(
    '/',
    {
      schema: {
        tags,
        headers: GetScoreCardInputSchema,
        response: {
          200: ScoreCardSchema,
          ...getErrorSchemas(404, 500),
        },
      },
    },
    getScoreCardHandler,
  )
  server.post(
    '/',
    {
      schema: {
        tags,
        body: CreateScoreCardInputSchema,
        response: {
          200: ScoreCardSchema,
          ...getErrorSchemas(404, 500),
        },
      },
    },
    createScoreCardHandler,
  )
}

import { FastifyInstance } from 'fastify'

import { createScoreCardHandler, getScoreCardHandler } from './controller'
import { ScoreCardSchema } from '@/prisma/generated/zod'
import { CreateScoreCardInputSchema, GetScoreCardInputSchema } from './schema'

const tags = ['score-card']

async function scoreCardRoutes(server: FastifyInstance) {
  server.get(
    '/',
    {
      schema: {
        tags,
        body: GetScoreCardInputSchema,
        response: {
          200: ScoreCardSchema,
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
        },
      },
    },
    createScoreCardHandler,
  )
}

export default scoreCardRoutes

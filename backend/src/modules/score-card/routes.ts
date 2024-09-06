import { FastifyInstance } from 'fastify'

import { createScoreCardHandler } from './controller'
import { ScoreCardSchema } from '@/prisma/generated/zod'
import { CreateScoreCardInputSchema } from './schema'

const tags = ['score-card']

async function scoreCardRoutes(server: FastifyInstance) {
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

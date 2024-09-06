import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { createScoreCardHandler } from './controller'
import {
  ScoreCardCreateInputSchema,
  ScoreCardSchema,
} from '@/prisma/generated/zod'

async function scoreCardRoutes(server: FastifyInstance) {
  server.post(
    '/',
    {
      schema: {
        body: ScoreCardCreateInputSchema,
        response: {
          200: z.array(ScoreCardSchema),
        },
      },
    },
    createScoreCardHandler,
  )
}

export default scoreCardRoutes

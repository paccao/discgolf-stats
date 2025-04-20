import { FastifyInstance } from 'fastify'

import {
  createScoreCardHandler,
  getMatchHistoryHandler,
  getScoreCardHandler,
} from './controller'
import { ScoreCardSchema } from '@/prisma/generated/zod'
import {
  CreateScoreCardInputSchema,
  IdHeaderInputSchema,
  MatchHistorySchemas,
} from './schema'
import { getErrorSchemas } from '@/utils/schema'

const tags = ['score-card']

export default async function scoreCardRoutes(server: FastifyInstance) {
  server.get(
    '/',
    {
      schema: {
        tags,
        headers: IdHeaderInputSchema,
        response: {
          200: ScoreCardSchema,
          ...getErrorSchemas(404, 500),
        },
      },
    },
    getScoreCardHandler,
  )
  server.get(
    '/matchhistory',
    {
      schema: {
        tags,
        headers: IdHeaderInputSchema,
        response: {
          200: MatchHistorySchemas,
          ...getErrorSchemas(404, 500),
        },
      },
    },
    getMatchHistoryHandler,
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

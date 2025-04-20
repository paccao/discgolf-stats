import { FastifyInstance } from 'fastify'

import { getPlayerMatchHistoryHandler } from './controller'
import {
  GetPlayerMatchHistoryResponseSchema,
  IdHeaderInputSchema,
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
          200: GetPlayerMatchHistoryResponseSchema,
          ...getErrorSchemas(404, 500),
        },
      },
    },
    getPlayerMatchHistoryHandler,
  )
}

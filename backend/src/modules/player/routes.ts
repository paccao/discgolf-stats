import { FastifyInstance } from 'fastify'

import { getPlayerMatchHistoryHandler } from './controller'
import {
  GetPlayerMatchHistoryParamsSchema,
  GetPlayerMatchHistoryResponseSchema,
} from './schema'
import { getErrorSchemas } from '@/utils/schema'

const tags = ['player']

export default async function playerRoutes(server: FastifyInstance) {
  server.get(
    '/matchhistory',
    {
      schema: {
        tags,
        headers: GetPlayerMatchHistoryParamsSchema,
        response: {
          200: GetPlayerMatchHistoryResponseSchema,
          ...getErrorSchemas(404, 500),
        },
      },
    },
    getPlayerMatchHistoryHandler,
  )
}

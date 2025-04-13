import { FastifyReply, FastifyRequest } from 'fastify'

import { CreateScoreCardInput } from './schema'
import { createScoreCard } from './service'

export async function createScoreCardHandler(
  request: FastifyRequest<{
    Body: CreateScoreCardInput
  }>,
  reply: FastifyReply,
) {
  const scoreCard = createScoreCard(request.body)
  if (scoreCard) return scoreCard

  reply.code(500)
}

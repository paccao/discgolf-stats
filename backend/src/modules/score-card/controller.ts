import { FastifyReply, FastifyRequest } from 'fastify'

import { CreateScoreCardInput, GetScoreCardInput } from './schema'
import { createScoreCard, getScoreCard } from './service'

export async function getScoreCardHandler(
  request: FastifyRequest<{
    Body: GetScoreCardInput
  }>,
  reply: FastifyReply,
) {
  const scoreCard = getScoreCard(request.body)
  if (scoreCard) return scoreCard

  reply.code(500)
}

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

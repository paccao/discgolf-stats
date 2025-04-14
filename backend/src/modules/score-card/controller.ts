import { FastifyReply, FastifyRequest } from 'fastify'

import { CreateScoreCardInput, GetScoreCardInput } from './schema'
import { createScoreCard, getScoreCard } from './service'
import { InternalServerError, NotFoundError } from '@/utils/errors'

export async function getScoreCardHandler(
  request: FastifyRequest<{
    Headers: GetScoreCardInput
  }>,
  reply: FastifyReply,
) {
  const id = request.headers.id

  const scoreCard = getScoreCard({ id })
  if (!scoreCard) {
    throw new NotFoundError('Scorecard not found')
  }

  reply.send(scoreCard)
}

export async function createScoreCardHandler(
  request: FastifyRequest<{
    Body: CreateScoreCardInput
  }>,
  reply: FastifyReply,
) {
  const scoreCard = createScoreCard(request.body)
  if (!scoreCard) {
    throw new InternalServerError('Unexpected error when creating Scorecard')
  }

  reply.send(scoreCard)
}

import { FastifyReply, FastifyRequest } from 'fastify'

import { CreateScoreCardInput, GetHeaderIDInput } from './schema'
import { createScoreCard, getScoreCard } from './service'
import { InternalServerError, NotFoundError } from '@/utils/errors'

export async function getScoreCardHandler(
  request: FastifyRequest<{
    Headers: GetHeaderIDInput
  }>,
  reply: FastifyReply,
) {
  const id = request.headers.id

  const scoreCard = await getScoreCard({ id })
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
  const scoreCard = await createScoreCard(request.body)
  if (!scoreCard) {
    throw new InternalServerError('Unexpected error when creating Scorecard')
  }

  reply.send(scoreCard)
}

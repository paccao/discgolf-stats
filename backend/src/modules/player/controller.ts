import { FastifyReply, FastifyRequest } from 'fastify'

import { getMatchHistory, getPlayerId } from './service'
import { UnauthorizedError } from '@/utils/errors'

export async function getPlayerMatchHistoryHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  if (!request.user?.id) {
    throw new UnauthorizedError('User not authorized, sign in and try again')
  }

  const playerId = await getPlayerId(request.user.id)

  const matchHistory = await getMatchHistory(playerId)

  return reply.send(matchHistory)
}

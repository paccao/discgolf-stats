import { FastifyReply, FastifyRequest } from 'fastify'

import { GetPlayerMatchHistoryParams } from './schema'
import { getMatchHistory } from './service'

export async function getPlayerMatchHistoryHandler(
  request: FastifyRequest<{ Params: GetPlayerMatchHistoryParams }>,
  reply: FastifyReply,
) {
  // IDEA: Maybe get player Id via the user Id from the session, and then we could remove
  // the id from the params
  // request.user?.id
  const matchHistory = await getMatchHistory(request.params.id)

  return reply.send(matchHistory)
}

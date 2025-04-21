import { FastifyReply, FastifyRequest } from 'fastify'

import { GetPlayerMatchHistoryParams } from './schema'
import { getMatchHistory } from './service'

// GET /players/:id/match-history

export async function getPlayerMatchHistoryHandler(
  request: FastifyRequest<{ Params: GetPlayerMatchHistoryParams }>,
  reply: FastifyReply,
) {
  // IDEA: Maybe get player Id via the user Id from the session, and then we could remove
  // the id from the params
  // request.user?.id

  // Get last 10 playerResults from a player (create endpoint) (pagination)
  // Get ScoreCard connected to each playerResult and get the course name from the connected courseId with a join - return startDate, endDate and course name
  const matchHistory = await getMatchHistory(request.params.id)

  request.log.debug(matchHistory)

  reply.send(matchHistory)
}

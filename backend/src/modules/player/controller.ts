import { FastifyReply, FastifyRequest } from 'fastify'
import prisma from '@/utils/prisma'

import { GetPlayerMatchHistoryParams } from './schema'

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

  const matchHistory = await prisma.playerResult.findMany({
    where: {
      AND: [
        { playerId: request.params.id },
        { scoreCard: { endDate: { not: null } } },
      ],
    },
    take: 10,
    orderBy: { scoreCard: { startDate: 'desc' } },
    select: {
      id: true,
      playerId: true,
      scores: true,
      scoreCard: {
        select: {
          id: true,
          course: {
            select: {
              id: true,
              name: true,
            },
          },
          startDate: true,
          endDate: true,
        },
      },
    },
  })

  request.log.debug(matchHistory)

  reply.send(matchHistory)
}

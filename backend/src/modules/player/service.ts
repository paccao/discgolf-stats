import { InternalServerError } from '@/utils/errors'
import prisma from '@/utils/prisma'

export async function getPlayerId(id: number) {
  const { playerId } = await prisma.user.findUniqueOrThrow({
    where: { id },
    select: { playerId: true },
  })

  if (!playerId) {
    throw new InternalServerError()
  }

  return playerId
}

export async function getMatchHistory(playerId: number) {
  const results = await prisma.playerResult.findMany({
    where: {
      AND: [{ playerId }, { scoreCard: { endDate: { not: null } } }],
    },
    take: 10,
    orderBy: {
      scoreCard: {
        startDate: 'desc',
      },
    },
    select: {
      scoreCard: {
        select: {
          startDate: true,
          endDate: true,
          course: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  })

  return results.map(({ scoreCard }) => scoreCard)
}

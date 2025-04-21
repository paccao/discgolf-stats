import prisma from '@/utils/prisma'

export async function getMatchHistory(playerId: number) {
  await prisma.playerResult.findMany({
    where: {
      AND: [{ playerId }, { scoreCard: { endDate: { not: null } } }],
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
}

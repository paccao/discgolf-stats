import prisma from '@/utils/prisma'

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

  return results.map((result) => ({
    startDate: result.scoreCard.startDate,
    endDate: result.scoreCard.endDate,
    courseName: result.scoreCard.course.name,
  }))
}

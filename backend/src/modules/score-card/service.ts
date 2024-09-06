import prisma from '@/utils/prisma'
import { CreateScoreCardInput } from './schema'

export async function createScoreCard({
  date,
  courseId,
}: CreateScoreCardInput) {
  return prisma.scoreCard.create({
    data: {
      date,
      course: {
        connect: {
          id: courseId,
        },
      },
    },
  })
}

import prisma from '@/utils/prisma'
import { CreateScoreCardInput, GetScoreCardInput } from './schema'
import { InternalServerError, NotFoundError } from '@/utils/errors'

export async function getScoreCard({ id }: GetScoreCardInput) {
  return prisma.scoreCard.findUniqueOrThrow({
    where: { id },
  })
}

export async function createScoreCard({
  date,
  courseId,
}: CreateScoreCardInput) {
  try {
    await prisma.course.findUniqueOrThrow({
      where: { id: courseId },
    })
  } catch (error) {
    throw new NotFoundError(`Course not found: ${courseId}`)
  }

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

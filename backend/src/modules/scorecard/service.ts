import prisma from '@/utils/prisma'
import { CreateScoreCardInput, GetScoreCardInput } from './schema'
import { NotFoundError } from '@/utils/errors'

export async function getScoreCard({ id }: GetScoreCardInput) {
  return prisma.scoreCard.findUnique({
    where: { id },
  })
}

export async function createScoreCard({
  date,
  courseId,
}: CreateScoreCardInput) {
  const course = await prisma.course.findUnique({ where: { id: courseId } })
  if (!course) {
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

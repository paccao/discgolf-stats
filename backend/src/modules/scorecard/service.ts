import prisma from '@/utils/prisma'
import { CreateScoreCardInput, GetHeaderIDInput } from './schema'
import { NotFoundError } from '@/utils/errors'

export async function getScoreCard({ id }: GetHeaderIDInput) {
  return prisma.scoreCard.findUnique({
    where: { id },
  })
}

export async function createScoreCard({
  startDate,
  courseId,
}: CreateScoreCardInput) {
  const course = await prisma.course.findUnique({ where: { id: courseId } })
  if (!course) {
    throw new NotFoundError(`Course not found: ${courseId}`)
  }

  return prisma.scoreCard.create({
    data: {
      startDate,
      course: {
        connect: {
          id: courseId,
        },
      },
    },
  })
}

import prisma from '@/utils/prisma'

export async function findCourses() {
  return prisma.course.findMany()
}

export function findCourseById(id: number) {
  return prisma.course.findFirst({
    where: { id },
  })
}

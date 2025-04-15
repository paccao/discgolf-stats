import { FastifyReply, FastifyRequest } from 'fastify'

import { findCourses, findCourseById } from './service'
import { GetCourseInput } from './schema'
import { NotFoundError } from '@/utils/errors'

export async function listCoursesHandler() {
  const courses = await findCourses()

  return courses
}

export async function getCourseHandler(
  request: FastifyRequest<{
    Params: GetCourseInput
  }>,
  _reply: FastifyReply,
) {
  const course = await findCourseById(request.params.id)

  if (!course) {
    throw new NotFoundError(
      `Could not find course with id ${request.params.id}`,
    )
  }

  return course
}

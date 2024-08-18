import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { findCourses, findCourseById } from './service'
import { GetCourseInput } from './schema'

export async function listCoursesHandler() {
  const courses = await findCourses()

  return courses
}

export async function getCourseHandler(
  request: FastifyRequest<{
    Params: z.infer<typeof GetCourseInput>
  }>,
  reply: FastifyReply,
) {
  const course = await findCourseById(request.params.id)

  if (course) {
    return course
  }
  
  reply.code(404)
}

import { FastifyReply, FastifyRequest } from 'fastify'
import { findCourses, findCourseById } from './service'
import { GetCourseInput } from './schema'

export async function listCoursesHandler() {
  return await findCourses()
}

export async function getCourseHandler(
  request: FastifyRequest<{
    Params: GetCourseInput
  }>,
  reply: FastifyReply,
) {
  return await findCourseById()
}

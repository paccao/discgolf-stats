import { FastifyReply, FastifyRequest } from 'fastify'

import { findCourseById } from './service'
import { GetCourseInput } from './schema'

export async function createScoreCardHandler(
  request: FastifyRequest<{
    // Params:
  }>,
  reply: FastifyReply,
) {
  //
}

export async function getCourseHandler(
  request: FastifyRequest<{
    Params: GetCourseInput
  }>,
  reply: FastifyReply,
) {
  const course = await findCourseById(request.params.id)

  if (course) {
    return course
  }

  reply.code(404)
}

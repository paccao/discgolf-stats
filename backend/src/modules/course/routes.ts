import { FastifyInstance } from 'fastify'

import { getCourseHandler, listCoursesHandler } from './controller'
import { CourseSchema } from '../../../prisma/generated/zod/index'
import { GetCourseInput } from './schema'

async function CourseRoutes(server: FastifyInstance) {
  server.get(
    '/',
    {
      schema: {
        response: {
          200: CourseSchema,
        },
      },
    },
    listCoursesHandler,
  )

  server.get(
    '/:id',
    {
      schema: {
        params: GetCourseInput,
        response: {
          200: CourseSchema,
        },
      },
    },
    getCourseHandler,
  )
}

export default CourseRoutes

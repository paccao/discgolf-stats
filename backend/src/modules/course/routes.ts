import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { getCourseHandler, listCoursesHandler } from './controller'
import { CourseSchema } from '../../../prisma/generated/zod/index'
import { GetCourseInputSchema } from './schema'

async function courseRoutes(server: FastifyInstance) {
  server.get(
    '/',
    {
      schema: {
        response: {
          200: z.array(CourseSchema),
        },
      },
    },
    listCoursesHandler,
  )

  server.get(
    '/:id',
    {
      schema: {
        params: GetCourseInputSchema,
        response: {
          200: CourseSchema,
        },
      },
    },
    getCourseHandler,
  )
}

export default courseRoutes

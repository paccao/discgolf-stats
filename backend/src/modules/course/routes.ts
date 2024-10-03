import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { getCourseHandler, listCoursesHandler } from './controller'
import { CourseSchema } from '@/prisma/generated/zod'
import { GetCourseInputSchema } from './schema'

const tags = ['course']

async function courseRoutes(server: FastifyInstance) {
  server.get(
    '/',
    {
      schema: {
        tags,
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
        tags,
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

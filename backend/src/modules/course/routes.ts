import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { getCourseHandler, listCoursesHandler } from './controller'
import { CourseSchema } from '@/prisma/generated/zod'
import { GetCourseInputSchema } from './schema'
import { getErrorSchemas } from '@/utils/schema'

const tags = ['course']

export default async function courseRoutes(server: FastifyInstance) {
  server.get(
    '/',
    {
      schema: {
        tags,
        response: {
          200: z.array(CourseSchema),
          ...getErrorSchemas(500),
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
          ...getErrorSchemas(404, 500),
        },
      },
    },
    getCourseHandler,
  )
}

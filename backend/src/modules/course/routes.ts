import { FastifyInstance } from 'fastify'
import { getCourseHandler, listCoursesHandler } from './controller'
import { CourseSchema } from '../../../prisma/generated/zod/index'

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
        response: {
          200: CourseSchema,
        },
      },
    },
    getCourseHandler,
  )
}

export default CourseRoutes

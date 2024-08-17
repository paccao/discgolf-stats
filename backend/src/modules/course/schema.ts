import { z } from 'zod'
import { CourseSchema } from '../../../prisma/generated/zod'

export const GetCourseInput = CourseSchema.pick({ id: true })

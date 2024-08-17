import { z } from 'zod'
import { CourseSchema } from '../../../prisma/generated/zod'

export type GetCourseInput = z.infer<typeof CourseSchema>

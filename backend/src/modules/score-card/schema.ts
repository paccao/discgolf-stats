import { z } from 'zod'

import { ScoreCardCreateInputSchema } from '@/prisma/generated/zod'
import { idParam } from '@/utils/schema'

export const CreateScoreCardSchema = z.object({
  id: idParam,
})

export const GetCourseInputSchema = z.object({
  id: idParam,
})

export type GetCourseInput = z.infer<typeof GetCourseInputSchema>

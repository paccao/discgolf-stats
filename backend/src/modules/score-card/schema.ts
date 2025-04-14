import { z } from 'zod'

import { idParam } from '@/utils/schema'

export const CreateScoreCardInputSchema = z.object({
  date: z.coerce.date(),
  courseId: idParam,
})

export const GetScoreCardInputSchema = z.object({
  scoreCardId: idParam,
})

export type CreateScoreCardInput = z.infer<typeof CreateScoreCardInputSchema>
export type GetScoreCardInput = z.infer<typeof GetScoreCardInputSchema>

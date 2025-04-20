import { z } from 'zod'

import { idParam } from '@/utils/schema'

export const CreateScoreCardInputSchema = z.object({
  date: z.coerce.date(),
  courseId: idParam,
})
export const MatchHistorySchema = z.array(
  z.object({
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    courseName: z.string(),
  }),
)

export const IdHeaderInputSchema = z.object({ id: idParam })

export type CreateScoreCardInput = z.infer<typeof CreateScoreCardInputSchema>
export type GetHeaderIDInput = z.infer<typeof IdHeaderInputSchema>
export type MatchHistoryResponse = z.infer<typeof MatchHistorySchema>

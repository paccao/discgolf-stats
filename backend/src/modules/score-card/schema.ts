import { z } from 'zod'

import { idParam } from '@/utils/schema'

export const CreateScoreCardInputSchema = z.object({
  date: z.coerce.date(),
  courseId: idParam,
})

export type CreateScoreCardInput = z.infer<typeof CreateScoreCardInputSchema>

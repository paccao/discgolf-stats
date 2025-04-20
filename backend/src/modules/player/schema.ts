import { z } from 'zod'

import { idParam } from '@/utils/schema'

export const GetPlayerMatchHistoryParamsSchema = z.object({ id: idParam })
export type GetPlayerMatchHistoryParams = z.infer<
  typeof GetPlayerMatchHistoryParamsSchema
>

export const GetPlayerMatchHistoryResponseSchema = z.array(
  z.object({
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    courseName: z.string(),
  }),
)

export type GetPlayerMatchHistoryResponse = z.infer<
  typeof GetPlayerMatchHistoryResponseSchema
>

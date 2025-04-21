import { z } from 'zod'

export const GetPlayerMatchHistoryResponseSchema = z.array(
  z.object({
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    course: z.object({ name: z.string() }),
  }),
)

export type GetPlayerMatchHistoryResponse = z.infer<
  typeof GetPlayerMatchHistoryResponseSchema
>

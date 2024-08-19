import { z } from 'zod'

import { idParam } from '../../utils/schema'

export const GetCourseInputSchema = z.object({
  id: idParam,
})

export type GetCourseInput = z.infer<typeof GetCourseInputSchema>

import { z } from 'zod'

const idParam = z.coerce.number().min(1).int()

export const GetCourseInput = z.object({
    id: idParam
})

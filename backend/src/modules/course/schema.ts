import { z } from 'zod'
import { idParam } from '../../utils/schema'

export const GetCourseInput = z.object({
    id: idParam
})

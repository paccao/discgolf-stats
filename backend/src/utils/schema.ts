import { z } from "zod"

/** Parse SQLite numeric id from URL params */
export const idParam = z.coerce.number().int().gte(1)

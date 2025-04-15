import { z } from 'zod'

/** Parse SQLite numeric id from URL params */
export const idParam = z.coerce.number().int().gte(1)

export const ErrorResponseSchema = z.object({
  message: z.string().optional(),
  details: z.string().optional(),
  code: z.string().optional(),
  cause: z.string().optional(),
})

type ErrorCode = 400 | 401 | 404 | 422 | 500

export function getErrorSchemas(...codes: ErrorCode[]) {
  return codes.reduce(
    (schemas, code) => {
      schemas[code] = ErrorResponseSchema
      return schemas
    },
    {} as Record<ErrorCode, typeof ErrorResponseSchema>,
  )
}

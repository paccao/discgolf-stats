import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { ENV } from './env'
import { Prisma } from '@prisma/client'

class AppError extends Error {
  code: number
  constructor(code: number = 500, message: string) {
    super(message)
    this.code = code
  }
}

export class BadRequest extends AppError {
  constructor(message: string) {
    super(400, message)
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(401, message)
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(404, message)
  }
}

export class UnprocessableContent extends AppError {
  constructor(message: string) {
    super(422, message)
  }
}

export class InternalServerError extends AppError {
  constructor(message: string) {
    super(500, message)
  }
}

/**
 * Handle most common errors, and only send error details to the client in development mode.
 */
export function errorHandler(
  error: Error,
  request: FastifyRequest,
  reply: FastifyReply,
) {
  request.log.error(error)

  // assume its a fastify error if the validation obj exist
  if ((error as FastifyError)?.validation) {
    const fastifyError = error as FastifyError

    reply.code(400).send({
      message: fastifyError.message,
      details:
        ENV.NODE_ENV === 'development' ? fastifyError : fastifyError.validation,
    })
  } else if (error instanceof AppError) {
    reply.code(error.code).send({ message: error.message })
  }
  // https://www.prisma.io/docs/orm/reference/error-reference#error-codes
  else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    request.log.error({
      code: error.code,
      message: error.message,
    })
    reply.code(500).send({
      message: 'Internal Server Error',
      details: ENV.NODE_ENV === 'development' ? error : undefined,
    })
  }
  // https://www.prisma.io/docs/orm/reference/error-reference#error-codes
  else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    request.log.error({
      cause: error.cause,
      message: error.message,
    })
    reply.code(500).send({
      message: 'Internal Server Error',
      details: ENV.NODE_ENV === 'development' ? error : undefined,
    })
  } else {
    reply.code(500).send({ message: 'Internal Server Error' })
  }
}

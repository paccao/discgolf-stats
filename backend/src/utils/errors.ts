import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { Prisma } from '@prisma/client'

import { ENV } from './env'

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
  static defaultMessage = 'Internal Server Error'

  constructor(message: string = InternalServerError.defaultMessage) {
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

  const isDEV = ENV.NODE_ENV === 'development'

  // assume its a fastify error if the validation obj exist
  if ((error as FastifyError)?.validation) {
    const fastifyError = error as FastifyError

    reply.code(400).send({
      message: fastifyError.message,
      details: isDEV ? fastifyError : fastifyError.validation,
    })
  } else if (error instanceof AppError) {
    let message

    if (isDEV) {
      message = error.message
    } else {
      if (error.code === 500) {
        message = InternalServerError.defaultMessage
      } else {
        message = error.message
      }
    }

    reply.code(error.code).send({
      message,
    })
  }
  // https://www.prisma.io/docs/orm/reference/error-reference#error-codes
  else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    request.log.error({
      code: error.code,
      message: error.message,
    })
    reply.code(500).send({
      message: InternalServerError.defaultMessage,
    })
  } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    request.log.error({
      cause: error.cause,
      message: error.message,
    })
    reply.code(500).send({
      message: InternalServerError.defaultMessage,
    })
  } else {
    reply.code(500).send({ message: InternalServerError.defaultMessage })
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { type InternalError } from '#domain/entities/index.js'
import { type IController } from '#presentation/protocols/controller.js'
import {
  type FastifyReply,
  type FastifyRequest,
  type RouteHandlerMethod,
} from 'fastify'

const parseBody = (
  body: Record<string, any> | undefined
): Record<string, any> => {
  const result: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(body ?? {})) {
    // eslint-disable-next-line security/detect-object-injection
    result[key] =
      typeof value === 'string' && /^{(.*)}$/i.test(value)
        ? JSON.parse(value)
        : value
  }

  return result
}

export function adaptController(controller: IController): RouteHandlerMethod {
  return async (req: FastifyRequest, res: FastifyReply): Promise<void> => {
    const request = {
      ...(req.params as Record<string, any>),
      ...parseBody(req.body as Record<string, any>),
    }

    try {
      const httpResponse = await controller.handle(request)

      return await res.status(httpResponse.statusCode).send(httpResponse.body)
    } catch (error) {
      console.error(error)
      const internalError = error as InternalError

      if (internalError.isInternal) {
        return await res.status(400).send({ message: internalError.message })
      }

      return await res.status(500).send({ message: 'Erro interno' })
    }
  }
}

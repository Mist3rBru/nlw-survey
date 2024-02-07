import { Http, NotFoundError } from '#domain/entities/index.js'
import { PollMapper } from '#domain/mappers/poll-mapper.js'
import type { IFindPollById } from '#domain/usecases/poll/find-by-id.js'
import { type IController } from '#presentation/protocols/index.js'
import { z } from 'zod'

export class FindPollByIdController implements IController {
  constructor(private readonly findPollById: IFindPollById) {}

  async handle(request: unknown): Promise<Http.Response> {
    const idSchema = z.object({
      id: z.string(),
    })

    const { id } = idSchema.parse(request)

    const result = await this.findPollById.findById(id)

    if (!result) {
      return Http.badRequest(new NotFoundError('poll'))
    }

    return Http.ok(new PollMapper(result).toHttp())
  }
}

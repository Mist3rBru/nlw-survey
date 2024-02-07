import { Http } from '#domain/entities/index.js'
import type { ICreatePoll } from '#domain/usecases/index.js'
import { type IController } from '#presentation/protocols/index.js'
import { z } from 'zod'

export class CreatePollController implements IController {
  constructor(private readonly createPoll: ICreatePoll) {}

  async handle(data: unknown): Promise<Http.Response> {
    const pollSchema = z.object({
      title: z.string(),
      options: z.array(z.string()),
    })

    const { title, options } = pollSchema.parse(data)

    const { poll } = await this.createPoll.create({ title, options })

    return Http.created({ pollId: poll.id })
  }
}

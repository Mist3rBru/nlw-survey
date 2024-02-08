import { Http } from '#domain/entities/index.js'
import { type ICreatePoll } from '#domain/usecases/index.js'
import {
  type IController,
  type IValidator,
} from '#presentation/protocols/http.js'

export class CreatePollController implements IController {
  constructor(
    private readonly validator: IValidator<{
      title: string
      options: string[]
    }>,
    private readonly createPoll: ICreatePoll
  ) {}

  async handle(data: unknown): Promise<Http.Response> {
    const { title, options } = this.validator.validate(data)

    const { poll } = await this.createPoll.create({ title, options })

    return Http.created({ pollId: poll.id })
  }
}

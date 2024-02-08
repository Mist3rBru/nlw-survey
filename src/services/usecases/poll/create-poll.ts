import { MissingParamError } from '#domain/entities/index.js'
import { Poll } from '#domain/entities/poll.js'
import { type ICreatePoll } from '#domain/usecases/index.js'
import { type ICreatePollRepository } from '#services/protocols/index.js'

export class CreatePoll implements ICreatePoll {
  constructor(private readonly createPollRepository: ICreatePollRepository) {}

  async create(data: ICreatePoll.Params): Promise<ICreatePoll.Result> {
    const { title, options } = data

    const poll = new Poll({ title, options })

    if (poll.options?.length === 0) {
      throw new MissingParamError('opções da pesquisa')
    }

    await this.createPollRepository.create(poll)

    return { poll }
  }
}

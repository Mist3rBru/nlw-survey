import { Http } from '#domain/entities/index.js'
import { PollMapper } from '#domain/mappers/poll-mapper.js'
import { type IListPolls } from '#domain/usecases/poll/list-polls.js'
import { type IController } from '#presentation/protocols/index.js'

export class ListPollsController implements IController {
  constructor(private readonly listPolls: IListPolls) {}

  async handle(request: unknown): Promise<Http.Response> {
    const result = await this.listPolls.list()

    return Http.ok(result.map(poll => new PollMapper(poll).toHttp()))
  }
}

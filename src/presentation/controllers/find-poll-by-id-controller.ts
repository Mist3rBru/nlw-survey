import { Http, NotFoundError } from '#domain/entities/index.js'
import { PollMapper } from '#domain/mappers/poll-mapper.js'
import { type IFindPollById } from '#domain/usecases/poll/find-poll-by-id.js'
import {
  type IController,
  type IValidator,
} from '#presentation/protocols/http.js'

export class FindPollByIdController implements IController {
  constructor(
    private readonly validator: IValidator<{ pollId: string }>,
    private readonly findPollById: IFindPollById
  ) {}

  async handle(request: unknown): Promise<Http.Response> {
    const { pollId } = this.validator.validate(request)

    const result = await this.findPollById.findById(pollId)

    if (!result) {
      return Http.badRequest(new NotFoundError('poll'))
    }

    return Http.ok(new PollMapper(result).toHttp())
  }
}

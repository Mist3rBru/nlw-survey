import { Http } from '#domain/entities/index.js'
import { type IVotePoll } from '#domain/usecases/index.js'
import { type IController } from '#presentation/protocols/controller.js'
import { type IPublisher } from '#services/protocols/data/publisher.js'
import { z } from 'zod'

export class VotePollController implements IController {
  constructor(
    private readonly votePoll: IVotePoll,
    private readonly votingPublisher: IPublisher
  ) {}

  async handle(request: unknown): Promise<Http.Response> {
    const votePollSchema = z.object({
      pollId: z.string(),
      pollOptionId: z.string(),
    })

    const { pollId, pollOptionId } = votePollSchema.parse(request)

    const poll = await this.votePoll.vote({ pollId, pollOptionId })

    this.votingPublisher.publish(poll.id, poll)

    return Http.created()
  }
}

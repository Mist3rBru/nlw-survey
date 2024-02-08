import { InvalidParamError, type Poll, Vote } from '#domain/entities/index.js'
import { type IVotePoll } from '#domain/usecases/index.js'
import { type IFindPollByIdRepository } from '#services/protocols/database/poll-repository.js'
import {
  type ICreateVoteRepository,
  type IIncrementVoteRepository,
} from '#services/protocols/database/vote-repository.js'

export class VotePoll implements IVotePoll {
  constructor(
    private readonly findPollByIdRepository: IFindPollByIdRepository,
    private readonly createVoteRepository: ICreateVoteRepository,
    private readonly incrementVoteRepository: IIncrementVoteRepository
  ) {}

  async vote(data: IVotePoll.Params): Promise<Poll> {
    const { pollId, pollOptionId } = data

    const poll = await this.findPollByIdRepository.findById(pollId)

    if (!poll) {
      throw new InvalidParamError('pollId')
    }

    const pollOption = poll.options?.find(option => option.id === pollOptionId)

    if (!pollOption) {
      throw new InvalidParamError('pollOptionId')
    }

    const vote = new Vote({ pollId, pollOptionId })

    await this.createVoteRepository.create(vote)

    pollOption.votes = await this.incrementVoteRepository.increment(vote)

    return poll
  }
}

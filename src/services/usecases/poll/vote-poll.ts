import { InvalidParamError } from '#domain/entities/index.js'
import { Vote } from '#domain/entities/vote.js'
import { type IVotePoll } from '#domain/usecases/index.js'
import { type IFindPollByIdRepository } from '#services/protocols/poll-repository.js'
import { type ICreateVoteRepository } from '#services/protocols/vote-repository.js'

export class VotePoll implements IVotePoll {
  constructor(
    private readonly findPollByIdRepository: IFindPollByIdRepository,
    private readonly createVoteRepository: ICreateVoteRepository
  ) {}

  async vote(data: IVotePoll.Params): Promise<Vote> {
    const { pollId, pollOptionId } = data

    const poll = await this.findPollByIdRepository.findById(pollId)

    if (!poll) {
      throw new InvalidParamError('pollId')
    }

    const optionExists = poll.options?.find(
      option => option.id === pollOptionId
    )

    if (!optionExists) {
      throw new InvalidParamError('pollOptionId')
    }

    const vote = new Vote({ pollId, pollOptionId })
    await this.createVoteRepository.create(vote)

    return vote
  }
}

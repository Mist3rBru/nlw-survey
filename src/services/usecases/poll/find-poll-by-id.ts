import { type Poll } from '#domain/entities/poll.js'
import { type IFindPollById } from '#domain/usecases/index.js'
import {
  type IFindPollByIdRepository,
  type IFindPollResultsRepository,
} from '#services/protocols/database/poll-repository.js'

export class FindPollById implements IFindPollById {
  constructor(
    private readonly findPollByIdRepository: IFindPollByIdRepository,
    private readonly findPollResultsRepository: IFindPollResultsRepository
  ) {}

  async findById(pollId: string): Promise<Poll | null> {
    const poll = await this.findPollByIdRepository.findById(pollId)

    if (!poll) {
      return null
    }

    const pollResults = await this.findPollResultsRepository.findResults(pollId)
    poll.votes = 0

    for (const result of pollResults) {
      const pollOption = poll.options?.find(
        option => option.id === result.pollId
      )

      if (!pollOption) {
        continue
      }

      poll.votes += result.votes
      pollOption.votes = result.votes
    }

    return poll
  }
}

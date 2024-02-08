import { PollRepository } from '#infra/database/postgres/poll-repository.js'
import { VoteRepository } from '#infra/database/postgres/vote-repository.js'
import { VotePollController } from '#presentation/controllers/vote-poll-controller.js'
import { type IController } from '#presentation/protocols/controller.js'
import { VotePoll } from '#services/usecases/poll/vote-poll.js'

export const makeVotePollController = (): IController => {
  const voteRepository = new VoteRepository()
  const pollRepository = new PollRepository()
  const votePoll = new VotePoll(pollRepository, voteRepository)
  const controller = new VotePollController(votePoll)

  return controller
}

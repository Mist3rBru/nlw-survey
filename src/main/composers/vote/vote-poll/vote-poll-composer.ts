import { PollRepository } from '#infra/database/postgres/poll-repository.js'
import { VoteRepository } from '#infra/database/postgres/vote-repository.js'
import { RedisRepository } from '#infra/database/redis/redis-repository.js'
import { VotePollController } from '#presentation/controllers/vote-poll-controller.js'
import { type IController } from '#presentation/protocols/controller.js'
import { VotePoll } from '#services/usecases/poll/vote-poll.js'

export const makeVotePollController = (): IController => {
  const voteRepository = new VoteRepository()
  const pollRepository = new PollRepository()
  const redisRepository = new RedisRepository()
  const votePoll = new VotePoll(pollRepository, voteRepository, redisRepository)
  const controller = new VotePollController(votePoll)

  return controller
}

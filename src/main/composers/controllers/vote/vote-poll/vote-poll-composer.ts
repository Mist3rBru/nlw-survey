import { PollRepository } from '#infra/database/postgres/poll-repository.js'
import { VoteRepository } from '#infra/database/postgres/vote-repository.js'
import { RedisRepository } from '#infra/database/redis/redis-repository.js'
import { publisher } from '#main/composers/data/publisher.js'
import { VotePollController } from '#presentation/controllers/vote-poll-controller.js'
import { type IController } from '#presentation/protocols/http.js'
import { ZodValidator } from '#presentation/validators/zod-validator.js'
import { VotePoll } from '#services/usecases/poll/vote-poll.js'
import { z } from 'zod'

export const makeVotePollController = (): IController => {
  const voteRepository = new VoteRepository()
  const pollRepository = new PollRepository()
  const redisRepository = new RedisRepository()
  const votePoll = new VotePoll(pollRepository, voteRepository, redisRepository)
  const validator = new ZodValidator(
    z.object({
      pollId: z.string(),
      pollOptionId: z.string(),
    })
  )
  const controller = new VotePollController(validator, votePoll, publisher)

  return controller
}

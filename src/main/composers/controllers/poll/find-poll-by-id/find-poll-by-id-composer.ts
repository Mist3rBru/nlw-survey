import { PollRepository } from '#infra/database/postgres/poll-repository.js'
import { RedisRepository } from '#infra/database/redis/redis-repository.js'
import { FindPollByIdController } from '#presentation/controllers/find-poll-by-id-controller.js'
import { type IController } from '#presentation/protocols/controller.js'
import { FindPollById } from '#services/usecases/poll/find-poll-by-id.js'

export const makeFindPollByIdController = (): IController => {
  const pollRepository = new PollRepository()
  const redisRepository = new RedisRepository()
  const findPollById = new FindPollById(pollRepository, redisRepository)
  const controller = new FindPollByIdController(findPollById)

  return controller
}

import { PollRepository } from '#infra/database/postgres/poll-repository.js'
import { RedisRepository } from '#infra/database/redis/redis-repository.js'
import { FindPollByIdController } from '#presentation/controllers/find-poll-by-id-controller.js'
import { type IController } from '#presentation/protocols/http.js'
import { ZodValidator } from '#presentation/validators/zod-validator.js'
import { FindPollById } from '#services/usecases/poll/find-poll-by-id.js'
import { z } from 'zod'

export const makeFindPollByIdController = (): IController => {
  const pollRepository = new PollRepository()
  const redisRepository = new RedisRepository()
  const findPollById = new FindPollById(pollRepository, redisRepository)
  const validator = new ZodValidator(
    z.object({
      pollId: z.string(),
    })
  )
  const controller = new FindPollByIdController(validator, findPollById)

  return controller
}

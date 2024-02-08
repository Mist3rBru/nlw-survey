import { PollRepository } from '#infra/database/postgres/poll-repository.js'
import { CreatePollController } from '#presentation/controllers/create-poll-controller.js'
import { type IController } from '#presentation/protocols/http.js'
import { ZodValidator } from '#presentation/validators/zod-validator.js'
import { CreatePoll } from '#services/usecases/poll/create-poll.js'
import { z } from 'zod'

export const makeCreatePollController = (): IController => {
  const pollRepository = new PollRepository()
  const createPoll = new CreatePoll(pollRepository)
  const validator = new ZodValidator(
    z.object({
      title: z.string().min(1),
      options: z.array(z.string().min(1)).min(2),
    })
  )
  const controller = new CreatePollController(validator, createPoll)

  return controller
}

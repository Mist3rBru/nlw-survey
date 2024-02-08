import { PollRepository } from '#infra/database/postgres/poll-repository.js'
import { CreatePollController } from '#presentation/controllers/create-poll-controller.js'
import { type IController } from '#presentation/protocols/controller.js'
import { CreatePoll } from '#services/usecases/poll/create-poll.js'

export const makeCreatePollController = (): IController => {
  const pollRepository = new PollRepository()
  const createPoll = new CreatePoll(pollRepository)
  const controller = new CreatePollController(createPoll)

  return controller
}
import { PollRepository } from '#infra/database/postgres/poll-repository.js'
import { FindPollByIdController } from '#presentation/controllers/find-by-id-controller.js'
import { type IController } from '#presentation/protocols/index.js'

export const makeFindPollByIdController = (): IController => {
  const pollRepository = new PollRepository()
  const controller = new FindPollByIdController(pollRepository)

  return controller
}

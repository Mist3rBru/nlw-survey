import { PollRepository } from '#infra/database/postgres/poll-repository.js'
import { ListPollsController } from '#presentation/controllers/list-polls-controller.js'
import { type IController } from '#presentation/protocols/http.js'

export const makeListPollsController = (): IController => {
  const pollRepository = new PollRepository()
  const controller = new ListPollsController(pollRepository)

  return controller
}

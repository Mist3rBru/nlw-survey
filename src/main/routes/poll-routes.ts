import { adaptController } from '#main/adapters/controller-adapter.js'
import { adaptPublisher } from '#main/adapters/websocket-adapter.js'
import {
  makeCreatePollController,
  makeFindPollByIdController,
  makeListPollsController,
} from '#main/composers/controllers/index.js'
import { publisher } from '#main/composers/data/publisher.js'
import { type FastifyInstance as Router } from 'fastify'

export default (router: Router): void => {
  router.get('/polls', adaptController(makeListPollsController()))

  router.get('/polls/:id', adaptController(makeFindPollByIdController()))

  router.get(
    '/polls/:id/results',
    { websocket: true },
    adaptPublisher(publisher)
  )

  router.post('/polls', adaptController(makeCreatePollController()))
}

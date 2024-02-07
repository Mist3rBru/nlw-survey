import { adaptController } from '#main/adapters/controller-adapter.js'
import {
  makeCreatePollController,
  makeFindPollByIdController,
  makeListPollsController,
} from '#main/composers/index.js'
import type { FastifyInstance as Router } from 'fastify'

export default (router: Router): void => {
  router.get('/polls', adaptController(makeListPollsController()))

  router.get('/polls/:id', adaptController(makeFindPollByIdController()))

  router.post('/polls', adaptController(makeCreatePollController()))
}

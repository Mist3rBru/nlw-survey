import { adaptController } from '#main/adapters/controller-adapter.js'
import { makeVotePollController } from '#main/composers/index.js'
import { type FastifyInstance as Router } from 'fastify'

export default (router: Router): void => {
  router.post('/vote', adaptController(makeVotePollController()))
}
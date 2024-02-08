import { adaptController } from '#main/adapters/controller-adapter.js'
import { makeVotePollController } from '#main/composers/controllers/index.js'
import { type FastifyInstance as Router } from 'fastify'

export default (router: Router): void => {
  router.post('/votes', adaptController(makeVotePollController()))
}

import { PoolRepository } from '#infra/database/postgres/pool-repository.js'
import { CreatePoolController } from '#presentation/controllers/index.js'
import { type IController } from '#presentation/protocols/index.js'
import { CreatePool } from '#services/usecases/index.js'

export const makeCreatePoolController = (): IController => {
  const poolRepository = new PoolRepository()
  const createPool = new CreatePool(poolRepository)
  const controller = new CreatePoolController(createPool)

  return controller
}

import { Pool } from '#domain/entities/pool.js'
import { type ICreatePool } from '#domain/usecases/index.js'
import type { ICreatePoolRepository } from '#services/protocols/pool-repository.js'

export class CreatePool implements ICreatePool {
  constructor(private readonly createPoolRepository: ICreatePoolRepository) {}

  async create(data: ICreatePool.Params): Promise<ICreatePool.Result> {
    const { title, options } = data

    const pool = new Pool({ title, options })
    await this.createPoolRepository.create(pool)

    return { pool }
  }
}

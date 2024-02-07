import { Pool } from '#domain/entities/pool.js'
import { PoolMapper, PoolOptionMapper } from '#domain/mappers/index.js'
import type {
  ICreatePoolRepository,
  IListPoolsRepository,
} from '#services/protocols/pool-repository.js'
import { db } from './client.js'

interface IPoolRepository extends ICreatePoolRepository, IListPoolsRepository {}

export class PoolRepository implements IPoolRepository {
  async create(data: Pool): Promise<void> {
    await db.pool.create({
      data: {
        ...new PoolMapper(data).toPrisma(),
        options: {
          createMany: {
            data: data.options.map(option => ({
              ...new PoolOptionMapper(option).toPrisma(),
              poolId: undefined,
            })),
          },
        },
      },
    })
  }

  async list(): Promise<Pool[]> {
    const data = await db.pool.findMany({
      include: {
        options: true,
      },
    })

    return data.map(d => new Pool(d))
  }
}

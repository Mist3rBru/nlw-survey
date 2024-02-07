import { Http } from '#domain/entities/index.js'
import type { ICreatePool } from '#domain/usecases/index.js'
import { type IController } from '#presentation/protocols/index.js'
import { z } from 'zod'

export class CreatePoolController implements IController {
  constructor(private readonly createPool: ICreatePool) {}

  async handle(data: unknown): Promise<Http.Response> {
    try {
      const poolSchema = z.object({
        title: z.string(),
        options: z.array(z.string()),
      })

      const { title, options } = poolSchema.parse(data)

      const { pool } = await this.createPool.create({ title, options })

      return Http.created({ poolId: pool.id })
    } catch (error) {
      return Http.serverError(error)
    }
  }
}

import type { Pool } from '#domain/entities/pool.js'

export interface ICreatePoolRepository {
  create(data: Pool): Promise<void>
}

export interface IListPoolsRepository {
  list(): Promise<Pool[]>
}

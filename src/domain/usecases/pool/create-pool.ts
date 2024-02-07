import type { Pool } from '#domain/entities/index.js'

export interface ICreatePool {
  create(data: ICreatePool.Params): Promise<ICreatePool.Result>
}

export namespace ICreatePool {
  export interface Params {
    title: string
    options: string[]
  }

  export interface Result {
    pool: Pool
  }
}

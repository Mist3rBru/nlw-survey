import { Pool } from './pool.js'
import { UUID } from './helpers/uuid.js'

export class PoolOption {
  private readonly props: PoolOption.Props

  constructor(params: PoolOption.Params) {
    this.props = {
      ...params,
      id: new UUID(params.id),
      poolId: UUID.parse(params.poolId),
      pool: params.pool ? new Pool(params.pool) : undefined,
    }
  }

  get id(): string {
    return this.props.id.value
  }

  get poolId(): string {
    return this.props.poolId
  }

  get title(): string {
    return this.props.title
  }

  get pool(): Pool | undefined {
    return this.props.pool
  }
}

export namespace PoolOption {
  export interface Params {
    id?: string
    poolId: string
    title: string

    pool?: Pool.Params
  }

  export interface Props {
    id: UUID
    poolId: string
    title: string

    pool: Pool | undefined
  }
}

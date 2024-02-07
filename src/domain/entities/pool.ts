import { UUID } from './helpers/uuid.js'
import { PoolOption } from './pool-option.js'

export class Pool {
  private readonly props: Pool.Props

  constructor(params: Pool.Params) {
    const poolId = new UUID(params.id)
    this.props = {
      ...params,
      id: poolId,
      options: params.options.map(option =>
        typeof option === 'string'
          ? new PoolOption({
              poolId: poolId.value,
              title: option,
            })
          : new PoolOption(option)
      ),

      createdAt: params.createdAt ?? new Date(),
      updatedAt: params.createdAt ?? new Date(),
    }
  }

  get id(): string {
    return this.props.id.value
  }

  get title(): string {
    return this.props.title
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date {
    return this.props.updatedAt
  }

  get options(): PoolOption[] {
    return this.props.options
  }
}

export namespace Pool {
  export interface Params {
    id?: string
    title: string
    options: PoolOption.Params[] | string[]
    createdAt?: Date
    updatedAt?: Date
  }

  export interface Props {
    id: UUID
    title: string
    options: PoolOption[]
    createdAt: Date
    updatedAt: Date
  }
}

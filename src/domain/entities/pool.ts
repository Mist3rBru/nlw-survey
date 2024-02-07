import { UUID } from './helpers/uuid.js'

export class Pool {
  private readonly props: Pool.Props

  constructor(params: Pool.Params) {
    this.props = {
      ...params,
      id: new UUID(params.id),
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
}

export namespace Pool {
  export interface Params {
    id?: string
    title: string
    createdAt?: Date
    updatedAt?: Date
  }

  export interface Props {
    id: UUID
    title: string
    createdAt: Date
    updatedAt: Date
  }
}

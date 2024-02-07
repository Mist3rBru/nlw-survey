import { UUID } from './helpers/uuid.js'

export class Vote {
  private readonly props: Vote.Props

  constructor(params: Vote.Params) {
    this.props = {
      id: new UUID(params.id),
      pollId: UUID.parse(params.pollId),
      pollOptionId: UUID.parse(params.pollOptionId),
      createdAt: params.createdAt ?? new Date(),
    }
  }

  get id(): string {
    return this.props.id.value
  }

  get pollId(): string {
    return this.props.pollId
  }

  get pollOptionId(): string {
    return this.props.pollOptionId
  }

  get createdAt(): Date {
    return this.props.createdAt
  }
}

export namespace Vote {
  export interface Params {
    id?: string
    pollId: string
    pollOptionId: string
    createdAt?: Date
  }

  export interface Props {
    id: UUID
    pollId: string
    pollOptionId: string
    createdAt: Date
  }
}

import { UUID } from './helpers/uuid.js'
import { PollOption } from './poll-option.js'

export class Poll {
  private readonly props: Poll.Props

  constructor(params: Poll.Params) {
    const pollId = new UUID(params.id)
    this.props = {
      ...params,
      id: pollId,
      options: params.options.map(option =>
        typeof option === 'string'
          ? new PollOption({
              pollId: pollId.value,
              title: option,
            })
          : new PollOption(option)
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

  get options(): PollOption[] {
    return this.props.options
  }
}

export namespace Poll {
  export interface Params {
    id?: string
    title: string
    options: PollOption.Params[] | string[]
    createdAt?: Date
    updatedAt?: Date
  }

  export interface Props {
    id: UUID
    title: string
    options: PollOption[]
    createdAt: Date
    updatedAt: Date
  }
}

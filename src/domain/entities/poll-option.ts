import { Poll } from './poll.js'
import { UUID } from './helpers/uuid.js'

export class PollOption {
  private readonly props: PollOption.Props

  constructor(params: PollOption.Params) {
    this.props = {
      ...params,
      id: new UUID(params.id),
      pollId: UUID.parse(params.pollId),
      poll: params.poll && new Poll(params.poll),
    }
  }

  get id(): string {
    return this.props.id.value
  }

  get pollId(): string {
    return this.props.pollId
  }

  get title(): string {
    return this.props.title
  }

  get poll(): Poll | undefined {
    return this.props.poll
  }

  get votes(): number | undefined {
    return this.votes
  }

  set votes(votes: number) {
    this.votes = votes
  }
}

export namespace PollOption {
  export interface Params {
    id?: string
    pollId: string
    title: string
    votes?: number

    poll?: Poll.Params
  }

  export interface Props {
    id: UUID
    pollId: string
    title: string
    votes?: number

    poll?: Poll
  }
}

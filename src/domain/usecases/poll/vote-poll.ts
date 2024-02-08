import { type Poll } from '#domain/entities/poll.js'

export interface IVotePoll {
  vote(data: IVotePoll.Params): Promise<Poll>
}

export namespace IVotePoll {
  export interface Params {
    pollId: string
    pollOptionId: string
  }
}

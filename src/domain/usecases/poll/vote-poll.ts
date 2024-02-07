import { type Vote } from '#domain/entities/vote.js'

export interface IVotePoll {
  vote(data: IVotePoll.Params): Promise<Vote>
}

export namespace IVotePoll {
  export interface Params {
    pollId: string
    pollOptionId: string
  }
}

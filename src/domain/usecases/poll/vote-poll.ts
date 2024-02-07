export interface IVotePoll {
  vote(data: IVotePoll.Params): Promise<void>
}

export namespace IVotePoll {
  export interface Params {
    pollId: string
    pollOptionId: string
  }
}

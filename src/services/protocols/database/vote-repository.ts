import { type Vote } from '#domain/entities/vote.js'

export interface ICreateVoteRepository {
  create(vote: Vote): Promise<void>
}

export interface IIncrementVoteRepository {
  increment(vote: Vote): Promise<number>
}

import { type Vote } from '#domain/entities/vote.js'

export interface ICreateVoteRepository {
  create(vote: Vote): Promise<void>
}

export interface IIncrementVoteCountRepository {
  increment(vote: Vote): Promise<void>
}

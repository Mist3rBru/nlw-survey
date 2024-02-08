import { type Poll } from '#domain/entities/index.js'

export interface ICreatePollRepository {
  create(data: Poll): Promise<void>
}

export interface IListPollsRepository {
  list(): Promise<Poll[]>
}

export interface IFindPollByIdRepository {
  findById(pollId: string): Promise<Poll | null>
}

export interface IFindPollResultsRepository {
  findResults(pollId: string): Promise<{ pollId: string; votes: number }[]>
}

import { type Poll } from '#domain/entities/index.js'

export interface ICreatePollRepository {
  create(data: Poll): Promise<void>
}

export interface IListPollsRepository {
  list(): Promise<Poll[]>
}

export interface IFindPollByIdRepository {
  findById(id: string): Promise<Poll | null>
}

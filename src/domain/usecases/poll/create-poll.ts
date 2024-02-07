import { type Poll } from '#domain/entities/index.js'

export interface ICreatePoll {
  create(data: ICreatePoll.Params): Promise<ICreatePoll.Result>
}

export namespace ICreatePoll {
  export interface Params {
    title: string
    options: string[]
  }

  export interface Result {
    poll: Poll
  }
}

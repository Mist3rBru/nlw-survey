import type { Poll } from '#domain/entities/index.js'

export interface IListPolls {
  list(): Promise<Poll[]>
}

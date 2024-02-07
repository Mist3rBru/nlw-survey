import type { Poll } from '#domain/entities/poll.js'

export interface IFindPollById {
  findById(pollId: string): Promise<Poll | null>
}

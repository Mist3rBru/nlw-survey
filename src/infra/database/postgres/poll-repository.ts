import { Poll } from '#domain/entities/poll.js'
import { PollMapper, PollOptionMapper } from '#domain/mappers/index.js'
import {
  type ICreatePollRepository,
  type IFindPollByIdRepository,
  type IListPollsRepository,
} from '#services/protocols/database/poll-repository.js'
import { db } from './client.js'

interface IPollRepository
  extends ICreatePollRepository,
    IListPollsRepository,
    IFindPollByIdRepository {}

export class PollRepository implements IPollRepository {
  async create(data: Poll): Promise<void> {
    await db.poll.create({
      data: {
        ...new PollMapper(data).toPrisma(),
        options: {
          createMany: {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            data: data.options!.map(option => ({
              ...new PollOptionMapper(option).toPrisma(),
              pollId: undefined,
            })),
          },
        },
      },
    })
  }

  async list(): Promise<Poll[]> {
    const data = await db.poll.findMany()

    return data.map(d => new Poll(d))
  }

  async findById(id: string): Promise<Poll | null> {
    const data = await db.poll.findUnique({
      where: {
        id,
      },
      include: {
        options: true,
      },
    })

    if (!data) return null

    return new Poll(data)
  }
}

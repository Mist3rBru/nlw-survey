import { Poll } from '#domain/entities/poll.js'
import { PollMapper, PollOptionMapper } from '#domain/mappers/index.js'
import type {
  ICreatePollRepository,
  IFindPollByIdRepository,
  IListPollsRepository,
} from '#services/protocols/poll-repository.js'
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
            data: data.options.map(option => ({
              ...new PollOptionMapper(option).toPrisma(),
              pollId: undefined,
            })),
          },
        },
      },
    })
  }

  async list(): Promise<Poll[]> {
    const data = await db.poll.findMany({
      include: {
        options: true,
      },
    })

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

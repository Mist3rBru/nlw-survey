import { type Vote } from '#domain/entities/index.js'
import { VoteMapper } from '#domain/mappers/vote-mapper.js'
import { type ICreateVoteRepository } from '#services/protocols/vote-repository.js'
import { db } from './client.js'

interface IVoteRepository extends ICreateVoteRepository {}

export class VoteRepository implements IVoteRepository {
  async create(data: Vote): Promise<void> {
    await db.vote.create({
      data: new VoteMapper(data).toPrisma(),
    })
  }
}

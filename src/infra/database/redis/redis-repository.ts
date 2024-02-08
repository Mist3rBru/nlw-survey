import { type Vote } from '#domain/entities/vote.js'
import { type IIncrementVoteCountRepository } from '#services/protocols/vote-repository.js'
import { redis } from './client.js'

interface IRedisRepository extends IIncrementVoteCountRepository {}

export class RedisRepository implements IRedisRepository {
  async increment(vote: Vote): Promise<void> {
    await redis.zincrby(vote.pollId, 1, vote.pollOptionId)
  }
}

/* eslint-disable security/detect-object-injection */
import { type Vote } from '#domain/entities/vote.js'
import { type IFindPollResultsRepository } from '#services/protocols/database/poll-repository.js'
import { type IIncrementVoteRepository } from '#services/protocols/database/vote-repository.js'
import { redis } from './client.js'

interface IRedisRepository
  extends IIncrementVoteRepository,
    IFindPollResultsRepository {}

export class RedisRepository implements IRedisRepository {
  async increment(vote: Vote): Promise<number> {
    const votes = await redis.zincrby(vote.pollId, 1, vote.pollOptionId)

    return Number(votes)
  }

  async findResults(
    pollId: string
  ): Promise<{ pollId: string; votes: number }[]> {
    const data = await redis.zrange(pollId, 0, -1, 'WITHSCORES')
    const results: { pollId: string; votes: number }[] = []

    for (let i = 0; i < data.length; i += 2) {
      results.push({
        pollId: data[i],
        votes: Number(data[i + 1]),
      })
    }

    return results
  }
}

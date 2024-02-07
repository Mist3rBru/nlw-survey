import { type Vote } from '#domain/entities/index.js'
import { type Vote as PrismaVote } from '@prisma/client'

export class VoteMapper {
  constructor(private readonly props: Vote) {}

  public toPrisma(): Omit<PrismaVote, 'id'> {
    return {
      pollId: this.props.pollId,
      pollOptionId: this.props.pollOptionId,
      createdAt: this.props.createdAt,
    }
  }
}

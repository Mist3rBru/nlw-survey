import { type PollOption } from '#domain/entities/index.js'
import { type PollOption as PrismaPollOption } from '@prisma/client'

export class PollOptionMapper {
  constructor(private readonly props: PollOption) {}

  public toPrisma(): PrismaPollOption {
    return {
      id: this.props.id,
      pollId: this.props.pollId,
      title: this.props.title,
    }
  }

  public toHttp() {
    return {
      id: this.props.id,
      pollId: this.props.pollId,
      title: this.props.title,
    }
  }
}

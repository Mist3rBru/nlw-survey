import { type Poll } from '#domain/entities/index.js'
import { type Poll as PrismaPoll } from '@prisma/client'
import { PollOptionMapper } from './poll-option-mapper.js'

export class PollMapper {
  constructor(private readonly props: Poll) {}

  public toPrisma(): PrismaPoll {
    return {
      id: this.props.id,
      title: this.props.title,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    }
  }

  public toHttp() {
    return {
      id: this.props.id,
      title: this.props.title,
      options: this.props.options?.map(option =>
        new PollOptionMapper(option).toHttp()
      ),
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    }
  }
}

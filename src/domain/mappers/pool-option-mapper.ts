import { type PoolOption } from '#domain/entities/index.js'
import { type PoolOption as PrismaPoolOption } from '@prisma/client'

export class PoolOptionMapper {
  constructor(private readonly props: PoolOption) {}

  public toPrisma(): PrismaPoolOption {
    return {
      id: this.props.id,
      poolId: this.props.poolId,
      title: this.props.title,
    }
  }

  public toHttp() {
    return {
      id: this.props.id,
      poolId: this.props.poolId,
      title: this.props.title,
    }
  }
}

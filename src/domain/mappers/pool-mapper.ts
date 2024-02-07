import { type Pool } from '#domain/entities/index.js'
import { type Pool as PrismaPool } from '@prisma/client'

export class PoolMapper {
  constructor(private readonly props: Pool) {}

  public toPrisma(): PrismaPool {
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
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    }
  }
}

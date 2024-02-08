import { ValidationError } from '#domain/entities/index.js'
import { type IValidator } from '#presentation/protocols/http.js'
import { type z } from 'zod'
import { fromZodError } from 'zod-validation-error'

export class ZodValidator<T> implements IValidator<T> {
  constructor(private readonly schema: z.ZodSchema<T>) {}

  translate(error: unknown): string {
    return fromZodError(error as z.ZodError, { prefix: null })
      .toString()
      .replaceAll(/Required at ([\w"]+)/g, 'Campo $1 é obrigatório')
      .replaceAll(
        /\w+ must contain at least (\d+) ([\w()]+) at ([\w"]+)/g,
        'Campo $3 deve ter no mínimo $1 $2'
      )
      .replaceAll('element(s)', 'elementos')
      .replaceAll('character(s)', 'caracteres')
      .trim()
  }

  validate(data: unknown): T {
    try {
      return this.schema.parse(data)
    } catch (error) {
      throw new ValidationError(this.translate(error))
    }
  }
}

import { type Http } from '#domain/entities/helpers/http.js'

export interface IController {
  handle(data: unknown): Promise<Http.Response>
}

export interface IValidator<TResult> {
  validate(data: unknown): TResult
}

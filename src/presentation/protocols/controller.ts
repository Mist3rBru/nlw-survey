import { type Http } from '#domain/entities/helpers/http.js'

export interface IController {
  handle(data: unknown): Promise<Http.Response>
}

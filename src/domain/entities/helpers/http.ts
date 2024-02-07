import { NotFoundError, ServerError } from './errors.js'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Http {
  public static ok = (body: unknown): Http.Response => ({
    statusCode: 200 as const,
    body,
  })

  public static created = (body: unknown): Http.Response => {
    return {
      statusCode: 201 as const,
      body,
    }
  }

  public static noContent = (): Http.Response => ({
    statusCode: 204 as const,
    body: {},
  })

  public static badRequest = (error: Error): Http.Response => ({
    statusCode: 400 as const,
    body: error,
  })

  public static notFound = (param: string): Http.Response => ({
    statusCode: 404 as const,
    body: new NotFoundError(param),
  })

  public static serverError = (error: unknown): Http.Response => ({
    statusCode: 500 as const,
    body: new ServerError(error as Error),
  })
}

export namespace Http {
  export type StatusCode = 200 | 201 | 204 | 400 | 401 | 403 | 404 | 500

  export interface Response {
    statusCode: StatusCode
    body: unknown
  }
}

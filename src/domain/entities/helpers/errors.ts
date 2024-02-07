export class InvalidParamError extends Error {
  constructor(param: string) {
    super(`Campo inválido: ${param}`)
    this.name = 'InvalidParamError'
  }
}

export class MissingParamError extends Error {
  constructor(param: string) {
    super(`Campo obrigatório: ${param}`)
    this.name = 'MissingParamError'
  }
}

export class NotFoundError extends Error {
  constructor(param: string) {
    super(`${param} não encontrado`)
    this.name = 'NotFoundError'
  }
}

export class ServerError extends Error {
  constructor(error: Error) {
    super('Erro interno')
    this.name = 'ServerError'
    this.stack = error.stack
    console.error(error)
  }
}

export class InternalError extends Error {
  isInternal: boolean

  constructor(message: string) {
    super(message)
    this.name = 'InternalError'
    this.isInternal = true
  }
}

export class InvalidParamError extends InternalError {
  constructor(param: string) {
    super(`Campo inválido: ${param}`)
    this.name = 'InvalidParamError'
  }
}

export class MissingParamError extends InternalError {
  constructor(param: string) {
    super(`Campo obrigatório: ${param}`)
    this.name = 'MissingParamError'
  }
}

export class NotFoundError extends InternalError {
  constructor(param: string) {
    super(`${param} não encontrado`)
    this.name = 'NotFoundError'
  }
}

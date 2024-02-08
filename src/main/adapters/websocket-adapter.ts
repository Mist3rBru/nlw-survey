import { type IPublisher } from '#services/protocols/data/publisher.js'
import { type SocketStream, type WebsocketHandler } from '@fastify/websocket'
import { type FastifyRequest } from 'fastify'

export function adaptPublisher(publisher: IPublisher): WebsocketHandler {
  return async (
    connection: SocketStream,
    request: FastifyRequest
  ): Promise<void> => {
    const params = request.params as { id: string }

    publisher.onPublish(params.id, message => {
      connection.socket.send(message)
    })
  }
}

import fastify, { type FastifyInstance as App } from 'fastify'
import { setupRoutes } from './routes.js'
import fastifyWebsocket from '@fastify/websocket'

export async function setupApp(): Promise<App> {
  const app = fastify()

  await app.register(fastifyWebsocket)

  await setupRoutes(app)

  return await app
}

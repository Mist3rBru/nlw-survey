import fastify, { type FastifyInstance as App } from 'fastify'
import { setupRoutes } from './routes.js'

export async function setupApp(): Promise<App> {
  const app = fastify()

  await setupRoutes(app)

  return await app
}

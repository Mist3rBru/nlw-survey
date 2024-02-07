import { readdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { FastifyInstance as Router } from 'fastify'

interface Routes {
  default(router: Router): void
}

export const setupRoutes = async (router: Router): Promise<void> => {
  const relativeRoutesFolder = '../routes'
  const dirname = fileURLToPath(new URL('.', import.meta.url))
  const absoluteRoutesFolder = resolve(dirname, relativeRoutesFolder)
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  const files = await readdir(absoluteRoutesFolder)

  for (const file of files) {
    const routes: Routes = await import(`${relativeRoutesFolder}/${file}`)
    routes.default(router)
  }
}

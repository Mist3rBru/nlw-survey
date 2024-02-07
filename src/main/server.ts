import { setupApp } from '#main/app/index.js'

setupApp()
  .then(async app => await app.listen({ port: 3000 }))
  .then(() => {
    process.stdout.write('🚀 Server running on http://localhost:3000\n')
  })
  .catch(console.error)

import initServer from './server'

import { ENV } from './utils/env'
import prisma from './utils/prisma'

const app = initServer()

async function main() {
  try {
    await app.ready()
    await app.listen({
      host: ENV.SERVER_HOST,
      port: ENV.PORT,
    })

    if (ENV.NODE_ENV === 'development') {
      app.log.info(
        `OpenAPI served at http://localhost:${ENV.PORT}/${ENV.OPENAPI_PREFIX}`,
      )
    }
  } catch (e) {
    app.log.error(e)
    process.exit(1)
  }
}

main()
  .catch(app.log.error)
  .finally(async () => {
    await prisma.$disconnect()
  })

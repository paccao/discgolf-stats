import initServer from './server'

import { ENV } from './utils/env'
import prisma from './utils/prisma'

const app = initServer()

async function main() {
  try {
    await app.ready()
    await app.listen({ port: ENV.PORT, host: '0.0.0.0' })

    console.log(`Server ready at http://localhost:${ENV.PORT}`)
    console.log(
      `OpenAPI served at http://localhost:${ENV.PORT}/${ENV.OPENAPI_PREFIX}`,
    )
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  })

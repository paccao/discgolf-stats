import initServer from './server'
import prisma from './utils/prisma'

const PORT = Number(process.env.PORT) ?? 8080
const OPENAPI_PREFIX = process.env.OPENAPI_PREFIX || 'api/docs'
const app = initServer()

async function main() {
  try {
    await app.ready()
    await app.listen({ port: PORT, host: '0.0.0.0' })

    console.log(`Server ready at http://localhost:${PORT}`)
    console.log(`OpenAPI served at http://localhost:${PORT}/${OPENAPI_PREFIX}`)
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

import buildServer from './server'
import { PrismaClient } from '@prisma/client'

const PORT = Number(process.env.PORT) ?? 8080

const prisma = new PrismaClient()
const server = buildServer()

async function main() {
  try {
    await server.listen({ port: PORT })

    console.log(`Server ready at http://${server}:${PORT}`)
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
  })

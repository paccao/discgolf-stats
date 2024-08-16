import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

const server = fastify()

const prisma = new PrismaClient()

async function main() {
  try {
    const query = await prisma.course.count()
  console.log(query);
  } catch (error) {
    console.log(error);
    
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



server.get('/ping', async (request, reply) => {
    return 'pong\n'
  })
  
  server.listen({ port: 8080 }, (err, address) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(`Server listening at ${address}`)
  })
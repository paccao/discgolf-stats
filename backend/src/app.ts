import initServer from './server'

const PORT = Number(process.env.PORT) ?? 8080
const app = initServer()

async function main() {
  try {
    await app.listen({ port: PORT, host: '0.0.0.0' })

    console.log(`Server ready at http://localhost:${PORT}`)
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

main()
  .catch(console.error)
  .finally(async () => {
    await app.prisma.$disconnect()
  })

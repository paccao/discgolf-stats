import fastify from 'fastify'

export const server = fastify({
  logger: {
    level: 'info',
  },
})

function buildServer() {
  server.get('/healthcheck', async function () {
    return { status: 'OK' }
  })

  // register zod schemas
  //   for (const schema of [...]) {}

  // register openapi

  // register routes
  return server
}

export default buildServer

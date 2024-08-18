import prisma from './prisma'
import { SessionStore } from '@fastify/session'

// IDEA: Extend fastify.session with your custom type.
declare module 'fastify' {
  interface Session {
    userId: string
    id?: number
  }
}

class SQLiteStore implements SessionStore {
  set(sessionId, session, callback) {
    // save to Session table, insert new sessionId with a given userId
  }

  get(sessionId, callback) {
    //
  }

  destroy(sessionId, callback) {
    //
  }
}

export default SQLiteStore


import mongoose from 'mongoose'

const MONGO_URI = process.env.DATABASE_URL

if (!MONGO_URI) {
  throw new Error('Please define the DATABASE_URL environment variable inside .env.local')
}

interface GlobalMongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}


let cached = (globalThis as any).mongoose as GlobalMongooseCache | undefined

if (!cached) {
  cached = (globalThis as any).mongoose = { conn: null, promise: null }
}

async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      bufferCommands: false,
    })
  }

  cached.conn = await cached.promise
  return cached.conn
}

export default connectDB

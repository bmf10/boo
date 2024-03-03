import { MongoMemoryServer } from 'mongodb-memory-server'

export const successResponse = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
  message = 'Success',
  code = 200,
) => ({
  status: {
    code: code,
    message: message,
  },
  message: message,
  data,
})

export const getMongoDbUri = async (): Promise<string> => {
  if (process.env.NODE_ENV === 'test') {
    const mongoServer = await MongoMemoryServer.create()
    const mongoUri = mongoServer.getUri()
    return mongoUri
  } else {
    return process.env.MONGO_DB_URI || ''
  }
}

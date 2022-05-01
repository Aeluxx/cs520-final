import mongoose from 'mongoose'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { NextHandler } from 'next-connect'

const connectDB = async (req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
  if (mongoose.connections[0].readyState) {
    // Use current db connection
    return next()
  }

  if (!process.env.DB_URL || !process.env.DB_NAME) {
    throw new Error('DB_URL or DB_NAME is not defined')
  }
  // Use new db connection
  await mongoose.connect(process.env.DB_URL, {
    dbName: process.env.DB_NAME,
  })

  return next()
}

export default connectDB

export function disconnectDb() {
  // Allow reload of models on code changes
  if (process.env.NODE_ENV === 'development') {
    mongoose.disconnect()
  }
}

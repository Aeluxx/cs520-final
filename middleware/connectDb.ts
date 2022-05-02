import mongoose from 'mongoose'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { NextHandler } from 'next-connect'

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    // Use current db connection
    return
  }

  console.log('process.env', JSON.stringify(process.env))
  if (!process.env.DB_URL || !process.env.DB_NAME) {
    throw new Error('DB_URL or DB_NAME is not defined')
  }
  // Use new db connection
  console.log('Trying to connect to DB...')
  await mongoose
    .connect(process.env.DB_URL, {
      dbName: process.env.DB_NAME,
    })
    .then(() => console.log('Sucessfully connected to DB'))
    .catch(err => console.log(`Error connecting to DB: ${err}`))

  return
}

export default connectDB

export function disconnectDb() {
  // Allow reload of models on code changes
  if (process.env.NODE_ENV === 'development') {
    mongoose.disconnect()
  }
}

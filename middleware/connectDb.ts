// import mongoose from 'mongoose'
// import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
// import { NextHandler } from 'next-connect'

// const connectDB = async () => {
//   if (mongoose.connections[0].readyState) {
//     // Use current db connection
//     return
//   }

//   console.log('process.env', JSON.stringify(process.env))
//   if (!process.env.DB_URL || !process.env.DB_NAME) {
//     throw new Error('DB_URL or DB_NAME is not defined')
//   }
//   // Use new db connection
//   console.log('Trying to connect to DB...')
//   await mongoose
//     .connect(process.env.DB_URL, {
//       dbName: process.env.DB_NAME,
//     })
//     .then(() => console.log('Sucessfully connected to DB'))
//     .catch(err => console.log(`Error connecting to DB: ${err}`))

//   return
// }

// export default connectDB

// export async function disconnectDb() {
//   // Allow reload of models on code changes
//   if (process.env.NODE_ENV === 'development') {
//     // await mongoose.disconnect()
//   }
// // /lib/dbConnect.js
import mongoose from 'mongoose'

/** 
Source : 
https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/utils/dbConnect.js 
**/

const DB_URL = process.env.DB_URL
const DB_NAME = process.env.DB_NAME

if (!DB_URL || !DB_NAME) {
  throw new Error('Please define the DB_NAME and DB_URL environment variable inside .env.local')
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
// @ts-ignore
let cached = global.mongoose

if (!cached) {
  // @ts-ignore
  cached = global.mongoose = { conn: null, promise: null }
}

async function connectDb() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      bufferMaxEntries: 0,
      useFindAndModify: true,
      useCreateIndex: true,
    }

    cached.promise = mongoose
      .connect(DB_URL as string, {
        dbName: DB_NAME,
      })
      .then(mongoose => {
        return mongoose
      })
  }
  cached.conn = await cached.promise
  return cached.conn
}

export default connectDb

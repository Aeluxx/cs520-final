import Note from '../../models/note'
import { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '../../middleware/connectDb'
import nc from 'next-connect'
import mongoose from 'mongoose'

const handler = nc()

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB()
  const { id } = req.query
  const note = await Note.findOne({_id: mongoose.Types.ObjectId(id as string)})
  res.status(200).send(note)
})

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB()
  const note = await Note.create(req.body)
  res.status(200).json(note)
})

handler.patch(async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB()
  const { id, content } = req.body
  const _id = mongoose.Types.ObjectId(id)
  console.log('patching')
  const note = await Note.updateOne({ _id }, { content })
    .then(value => {
      console.log('value', value)
      res.status(200)
    })
    .catch(err => {
      console.log('err', err)
      res.status(500)
    })
})

export default handler

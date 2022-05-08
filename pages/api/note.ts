import Note from '../../models/note'
import { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '../../middleware/connectDb'
import nc from 'next-connect'
import mongoose from 'mongoose'

const handler = nc()

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB()
  console.log('fetching note')
  const { id } = req.query
  const note = await Note.findOne({ _id: mongoose.Types.ObjectId(id as string) })
  res.status(200).send(note)
})

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB()
  const note = await Note.create(req.body)
  res.status(200).json(note)
})

handler.patch(async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB()
  console.log('patching note')
  const { id, content, title } = req.body
  console.log('title', title)
  const _id = mongoose.Types.ObjectId(id)
  const note = await Note.findOneAndUpdate({ _id }, { content, title }, { new: true })
    .then(value => {
      res.status(200).send(value)
    })
    .catch(err => {
      res.status(500)
    })
})

handler.delete(async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();
  const { id } = req.body;
  const deleteRes = Note.deleteOne({ _id: mongoose.Types.ObjectId(id) });
  res.status(200).send(deleteRes);
});

export default handler

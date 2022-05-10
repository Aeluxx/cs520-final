import mongoose from 'mongoose'
import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import connectDB from '../../middleware/connectDb'
import Section from '../../models/section'

const handler = nc()

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB()
  const sections = await Section.find({})
  res.status(200).json(sections)
})

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB()
  const { name, userId } = req.body
  if (!name || !userId) {
    res.status(500).send('No name or user ID provided')
  } else {
    // If user tries to create a seciton that already exists, add them to the existing section
    const existingSection = await Section.findOne({ name })
    if (existingSection) {
      await existingSection.update({ userIds: [...existingSection.userIds, userId] })
      res.status(200).json('Class successfully created')
    } else {
      const section = await Section.create({ name, userIds: [userId] })
      res.status(200).json('Class successfully created')
    }
  }
})

handler.delete(async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB()
  await Section.deleteOne({ _id: mongoose.Types.ObjectId(req.body.id) })
  res.status(200).end()
})

export default handler

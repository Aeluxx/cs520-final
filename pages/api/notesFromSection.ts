import { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '../../middleware/connectDb'
import Notes from '../../models/note'
import nc from 'next-connect'
import mongoose from 'mongoose'

const handler = nc()

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB()
  const sectionId = req.query.sectionId
  let objId;
  try {
    objId = mongoose.Types.ObjectId(sectionId as string);
  } catch (e) {
    res.status(200).json([]);
    return;
  }
  const notes = await Notes.find({ sectionId: objId });
  res.status(200).json(notes)
})

export default handler

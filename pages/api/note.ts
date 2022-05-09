import Note from '../../models/note'
import { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '../../middleware/connectDb'
import nc from 'next-connect'
import mongoose from 'mongoose'
import Section from "../../models/section";

const handler = nc();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();
  const { id } = req.query;
  if (!id) {
    res.status(200).json(await Note.find({}));
  } else {
    const note = await Note.findOne({
      _id: mongoose.Types.ObjectId(id as string),
    });
    res.status(200).send(note);
  }
});

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();
  const note = await Note.create(req.body);
  res.status(200).json(note);
});

handler.patch(async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();
  const { id, content, title } = req.body;
  const _id = mongoose.Types.ObjectId(id);
  const note = await Note.findOneAndUpdate(
    { _id },
    { content, title },
    { new: true }
  )
    .then(value => {
      res.status(200).send(value);
    })
    .catch(err => {
      res.status(500).end();
    });
});

handler.delete(async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();
  const { id } = req.query;
  const deleteRes = await Note.deleteOne({
    _id: mongoose.Types.ObjectId(id as string),
  });
  console.log(deleteRes);
  res.status(200).send(deleteRes);
});

export default handler

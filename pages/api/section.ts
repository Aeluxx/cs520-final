import mongoose from 'mongoose'
import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../middleware/connectDb";
import Section from "../../models/section";
import nc from "next-connect";

const handler = nc();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();
  const sections = await Section.find({});
  res.status(200).json(sections);
});

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();
  const section = await Section.create(req.body);
  res.status(200).json(section);
});

handler.delete(async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();
  await Section.deleteOne({_id: mongoose.Types.ObjectId(req.body.id)})
  res.status(200)
});

export default handler;

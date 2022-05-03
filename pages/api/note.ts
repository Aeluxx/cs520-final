import Note from "../../models/note";
import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../middleware/connectDb";
import nc from "next-connect";

const handler = nc();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();
  const notes = await Note.find({});
  res.status(200).json(notes);
});

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();
  const note = await Note.create(req.body);
  res.status(200).json(note);
});

export default handler;

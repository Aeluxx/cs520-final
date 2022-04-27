import Note from "../../models/note";

import { NextApiRequest, NextApiResponse } from "next";
import connectDB, { disconnectDb } from "../../middleware/connectDb";
import nc from "next-connect";

const handler = nc();

handler.use(connectDB);

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const notes = await Note.find({});
  res.status(200).json(notes);
  disconnectDb();
});

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const note = await Note.create(req.body);
  res.status(200).json(note);
  disconnectDb();
});

export default handler;

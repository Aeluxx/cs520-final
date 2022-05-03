import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../middleware/connectDb";
import Notes from "../../models/note";
import nc from "next-connect";

const handler = nc();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();
  const sectionId = req.body.sectionId;
  const notes = await Notes.find({ sectionId });
  res.status(200).json(notes);
});

export default handler;

import { NextApiRequest, NextApiResponse } from "next";
import connectDB, { disconnectDb } from "../../middleware/connectDb";
import Section from "../../models/section";
import nc from "next-connect";

const handler = nc();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();
  const sections = await Section.find({});
  res.status(200).json(sections);
  disconnectDb();
});

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();
  const section = await Section.create(req.body);
  res.status(200).json(section);
  disconnectDb();
});

export default handler;

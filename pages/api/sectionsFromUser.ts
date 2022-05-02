import { NextApiRequest, NextApiResponse } from "next";
import connectDB, { disconnectDb } from "../../middleware/connectDb";
import Section from "../../models/section";
import nc from "next-connect";

const handler = nc();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();
  const userId = req.body.userId;
  const sections = await Section.find({ userIds: { $in: [userId] } });
  res.status(200).json(sections);
  disconnectDb();
});

export default handler;

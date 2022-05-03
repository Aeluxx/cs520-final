import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../middleware/connectDb";
import Section from "../../models/section";
import nc from "next-connect";

const handler = nc();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();
  const userId = req.query.userId;
  const sections = await Section.find({ userIds: { $in: [userId] } });
  res.status(200).json(sections);
});

export default handler;

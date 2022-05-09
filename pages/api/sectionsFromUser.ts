import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../middleware/connectDb";
import Section from "../../models/section";
import nc from "next-connect";
import mongoose from "mongoose";

const handler = nc();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();
  let objId;
  try {
    objId = mongoose.Types.ObjectId(req.query.userId as string);
  } catch (e) {
    res.status(200).json([]);
    return;
  }
  const sections = await Section.find({ userIds: { $in: [objId] } });
  res.status(200).json(sections);
});

export default handler;

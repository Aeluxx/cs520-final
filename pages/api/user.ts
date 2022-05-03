import User from "../../models/user";
import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../middleware/connectDb";
import nc from "next-connect";

const handler = nc();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();
  const users = await User.find({});
  res.status(200).json(users);
});

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();
  const user = await User.create(req.body);
  res.status(200).json(user);
});

export default handler;

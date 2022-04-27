import User from "../../models/user";

import { NextApiRequest, NextApiResponse } from "next";
import connectDB, { disconnectDb } from "../../middleware/connectDb";
import nc from "next-connect";

const handler = nc();

handler.use(connectDB);

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const users = await User.find({});
  res.status(200).json(users);
  disconnectDb();
});

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await User.create(req.body);
  res.status(200).json(user);
  disconnectDb();
});

export default handler;

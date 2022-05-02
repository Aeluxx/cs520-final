import { NextApiRequest, NextApiResponse } from "next";
import connectDB, { disconnectDb } from "../../middleware/connectDb";
import Notes from "../../models/note";
import nc from "next-connect";
import User from "../../models/user";

const handler = nc();

// Requires Body: { sectionId: string, userId: string }
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();
  const user = await User.findOne({ _id: req.body.userId });
  const notes = await Notes.find({
    sectionId: req.body.sectionId,
    _id: { $in: user.favoriteNoteIds },
  });
  // const sectionId = req.body.sectionId;
  // const notes = await Notes.find({ sectionId });
  res.status(200).json(notes);
  disconnectDb();
});

export default handler;

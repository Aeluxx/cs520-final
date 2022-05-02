import { NextApiRequest, NextApiResponse } from "next";
import connectDB, { disconnectDb } from "../../middleware/connectDb";
import Notes from "../../models/note";
import nc from "next-connect";
import User from "../../models/user";
import { ObjectId } from "mongodb";

const handler = nc();

// Requires Body: { sectionId: string, userId: string }
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();
  const user = await User.findOne({ _id: req.body.userId });
  const notes = await Notes.find({
    sectionId: req.body.sectionId,
    _id: { $in: user.favoriteNoteIds },
  });
  res.status(200).json(notes);
  disconnectDb();
});

// Requires Body: { userId: string, noteId: string }
handler.delete(async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();
  const user = await User.findOne({ _id: req.body.userId });
  user.favoriteNoteIds = user.favoriteNoteIds.filter(
    (id: any) => id.toString() !== req.body.noteId
  );
  await user.save();
  res.status(200).json(user);
  disconnectDb();
});

// Requires Body: { userId: string, noteId: string }
handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();
  const user = await User.findOne({ _id: req.body.userId });
  if (!user.favoriteNoteIds.includes(req.body.noteId)) {
    user.favoriteNoteIds.push(req.body.noteId);
  }
  await user.save();
  res.status(200).json(user);
  disconnectDb();
});

export default handler;

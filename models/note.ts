import mongoose from "mongoose";
const Schema = mongoose.Schema;

const note = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  sectionId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

const Note = mongoose.models["Note"] ?? mongoose.model("Note", note);

export default Note;

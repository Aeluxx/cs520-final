import mongoose from "mongoose";
const Schema = mongoose.Schema;

const section = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  name: {
    type: String,
    required: true,
  },
  userIds: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
});

const Section =
  mongoose.models["Section"] ?? mongoose.model("Section", section);

export default Section;

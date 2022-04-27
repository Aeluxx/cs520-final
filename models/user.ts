import mongoose from "mongoose";
const Schema = mongoose.Schema;

const user = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  sectionIds: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
});

const User = mongoose.models["User"] ?? mongoose.model("User", user);

export default User;

import { Schema } from "mongoose";

const Users = new Schema({
  name: String,
  email: String,
  password: String,
});

const Classes = new Schema({
  name: String,
  users: [{ type: Schema.Types.ObjectId, ref: "Users" }],
});

const Notes = new Schema({
  classes: [{ type: Schema.Types.ObjectId, ref: "Classes" }],
  title: String,
  contents: String,
});

export default { Users, Classes, Notes };

import mongoose from "mongoose";
import bcrypt from 'bcrypt'
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

// user.pre(
//   'save',
//   async (next) => {
//     // const user = this
//     // // @ts-ignore
//     // const hash = await bcrypt.hash(this.password, 10)

//     // // @ts-ignore
//     // this.password = hash
//     next()
//   }
// )

const User = mongoose.models["User"] ?? mongoose.model("User", user);



export default User;

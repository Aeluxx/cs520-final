import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const Schema = mongoose.Schema

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
  favoriteNoteIds: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
});

// https://www.digitalocean.com/community/tutorials/api-authentication-with-json-web-tokensjwt-and-passport
user.pre('save', async function (next) {
  const user = this as any
  const hash = await bcrypt.hash(user.password, 10)

  user.password = hash
  next()
})

const User = mongoose.models['User'] ?? mongoose.model('User', user)

export default User

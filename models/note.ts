import mongoose from 'mongoose'
const Schema = mongoose.Schema

const note = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
      auto: true,
    },
    title: {
      type: String,
      required: true,
      default: 'New Note'
    },
    content: {
      type: String,
    },
    sectionId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
)

const Note = mongoose.models['Note'] ?? mongoose.model('Note', note)

export default Note

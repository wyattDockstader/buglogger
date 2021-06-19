import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const NoteSchema = new Schema(
  {
    body: { type: String, required: true },
    bug: { type: Schema.Types.ObjectId, ref: 'Bug', required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

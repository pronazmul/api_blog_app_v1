// Required Packeges
import { Schema, Types, model } from 'mongoose'

const CommentSchema = Schema(
  {
    content: { type: String, required: true },
    user: { type: Types.ObjectId, ref: 'People', required: true },
    blog: { type: Types.ObjectId, ref: 'Blog', required: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
)

// Make Model
const CommentModel = model('Comment', CommentSchema)

// Export Model
export default CommentModel

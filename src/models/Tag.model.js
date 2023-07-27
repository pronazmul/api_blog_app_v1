// Required Packeges
import { Schema, model } from 'mongoose'

const TagSchema = Schema(
  {
    name: { type: String, required: true },
    blogCount: { type: Number, default: 0 },
  },
  { timestamps: true, versionKey: false }
)

// Make Model
const TagModel = model('Tag', TagSchema)

// Export Model
export default TagModel

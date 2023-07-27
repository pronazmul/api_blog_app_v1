// Required Packeges
import { Schema, model, Types } from 'mongoose'

const LikeSchema = Schema(
  {
    user: { type: Types.ObjectId, ref: 'People', required: true },
    blog: { type: Types.ObjectId, ref: 'Blog', required: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
)

// Make Model
const LikeModel = model('Like', LikeSchema)

// Export Model
export default LikeModel

// Required Packeges
import { Schema, model, Types } from 'mongoose'

const FollowerSchema = Schema(
  {
    follower: { type: Types.ObjectId, ref: 'People', required: true },
    following: { type: Types.ObjectId, ref: 'People', required: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
)

// Make Model
const FollowerModel = model('Follower', FollowerSchema)

// Export Model
export default FollowerModel

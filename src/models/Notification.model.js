// Required Packeges
import { Schema, model, Types } from 'mongoose'

const NotificationSchema = Schema(
  {
    creator: { type: Types.ObjectId, ref: 'People', required: true },
    user: { type: Types.ObjectId, ref: 'People', required: true },
    blog: { type: Types.ObjectId, ref: 'Blog' },
    content: { type: String, required: true },
    type: {
      type: String,
      enum: ['blog', 'like', 'comment', 'follow'],
      default: 'blog',
    },
    readStatus: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
)

// Make Model
const NotificationModel = model('Notification', NotificationSchema)

// Export Model
export default NotificationModel

// Required Packeges
import { Schema, model, Types } from 'mongoose'

const NotificationSchema = Schema(
  {
    user: { type: Types.ObjectId, ref: 'People', required: true },
    content: { type: String, required: true },
    readStatus: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
)

// Make Model
const NotificationModel = model('Notification', NotificationSchema)

// Export Model
export default NotificationModel

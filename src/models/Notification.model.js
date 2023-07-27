// Required Packeges
import { Schema, model } from 'mongoose'

const NotificationSchema = Schema({}, { timestamps: true, versionKey: false })

// Make Model
const NotificationModel = model('Notification', NotificationSchema)

// Export Model
export default NotificationModel

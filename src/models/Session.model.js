// Required Packeges
import { Schema, Types, model } from 'mongoose'

const sessionSchema = Schema(
  {
    user: { type: Types.ObjectId, ref: 'People', required: true },
    valid: { type: Boolean, default: true },
    userAgent: { type: String },
  },
  { timestamps: true, versionKey: false }
)

// Make User Modelresult
const SessionModel = model('Session', sessionSchema)

// Export User Model
export default SessionModel

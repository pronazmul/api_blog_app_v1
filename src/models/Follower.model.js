// Required Packeges
import { Schema, model } from 'mongoose'

const FollowerSchema = Schema({}, { timestamps: true, versionKey: false })

// Make Model
const FollowerModel = model('Follower', FollowerSchema)

// Export Model
export default FollowerModel

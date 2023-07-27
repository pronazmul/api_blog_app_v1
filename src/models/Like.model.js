// Required Packeges
import { Schema, model } from 'mongoose'

const LikeSchema = Schema({}, { timestamps: true, versionKey: false })

// Make Model
const LikeModel = model('Like', LikeSchema)

// Export Model
export default LikeModel

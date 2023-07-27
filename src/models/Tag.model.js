// Required Packeges
import { Schema, model } from 'mongoose'

const TagSchema = Schema({}, { timestamps: true, versionKey: false })

// Make Model
const TagModel = model('Tag', TagSchema)

// Export Model
export default TagModel

// Required Packeges
import { Schema, model } from 'mongoose'

const CommentSchema = Schema({}, { timestamps: true, versionKey: false })

// Make Model
const CommentModel = model('Comment', CommentSchema)

// Export Model
export default CommentModel

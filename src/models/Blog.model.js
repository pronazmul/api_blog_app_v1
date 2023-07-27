// Required Packeges
import { Schema, model } from 'mongoose'

const BlogSchema = Schema({}, { timestamps: true, versionKey: false })

// Make Model
const BlogModel = model('Blog', BlogSchema)

// Export Model
export default BlogModel

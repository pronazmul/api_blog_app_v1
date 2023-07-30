// Required Packeges
import { Schema, model, Types } from 'mongoose'

const BlogSchema = Schema(
  {
    user: { type: Types.ObjectId, ref: 'People', required: true },
    category: { type: Types.ObjectId, ref: 'Category', required: true },
    tags: [{ type: Types.ObjectId, ref: 'Tag' }],
    title: { type: String },
    content: { type: String },
    image: { type: String },
    likesCount: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
  },
  { timestamps: true, versionKey: false }
)

// Make Model
const BlogModel = model('Blog', BlogSchema)

// Export Model
export default BlogModel

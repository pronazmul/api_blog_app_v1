// Required Packeges
import mongoose, { Schema, model, Types } from 'mongoose'
import CategoryModel from './Category.model.js'

const BlogSchema = Schema(
  {
    user: { type: Types.ObjectId, ref: 'People', required: true },
    category: {
      type: Types.ObjectId,
      ref: 'Category',
    },
    subcategory: {
      type: Types.ObjectId,
      ref: 'SubCategory',
    },
    tags: [{ type: Types.ObjectId, ref: 'Tag' }],
    title: { type: String },
    content: { type: String },
    image: { type: String },
    likesCount: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
  },
  { timestamps: true, versionKey: false }
)

if (!mongoose.models.Category) {
  model('Category', CategoryModel.schema)
}

// Make Model
const BlogModel = model('Blog', BlogSchema)

// Export Model
export default BlogModel

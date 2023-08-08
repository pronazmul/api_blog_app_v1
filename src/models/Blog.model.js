// Required Packeges
import mongoose, { Schema, model, Types } from 'mongoose'
import CategoryModel from './Category.model.js'
import config from '../config/index.js'

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

// Post-middleware function
BlogSchema.post(/^find|^findOne|^findById|^save/, function (docs, next) {
  // Check the response is object
  if (typeof docs === 'object' && !Array.isArray(docs) && docs?.image) {
    docs.image = `${config.server_url}/${config.blog_directory}/${docs.image}`
  }

  // Check IF the response is object
  if (Array.isArray(docs)) {
    let transformedDocs = docs.map((item) => {
      if (item?.image) {
        item.image = `${config.server_url}/${config.blog_directory}/${item.image}`
      }
      return item
    })
    docs = transformedDocs
  }

  next()
})

// Static Functions
BlogSchema.statics.incrementLikes = function (id) {
  return this.findOneAndUpdate({ _id: id }, { $inc: { likesCount: 1 } })
}

BlogSchema.statics.decrementLikes = function (id) {
  return this.findOneAndUpdate({ _id: id }, { $inc: { likesCount: -1 } })
}

// Make Model
const BlogModel = model('Blog', BlogSchema)

// Export Model
export default BlogModel

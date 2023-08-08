// Required Packeges
import { Schema, model } from 'mongoose'
import config from '../config/index.js'
import uniqueValidator from 'mongoose-unique-validator'

const CategorySchema = Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
  },
  { timestamps: true, versionKey: false }
)

// Integrate MOngoose Unique Validoator Plugin
CategorySchema.plugin(uniqueValidator, {
  message: '{VALUE} Already Exists!',
})

// Post-middleware function
CategorySchema.post(/^find|^findOne|^findById|^save/, function (docs, next) {
  // Check the response is object
  if (typeof docs === 'object' && !Array.isArray(docs) && docs?.image) {
    docs.image = `${config.server_url}/${config.category_directory}/${docs.image}`
  }

  // Check IF the response is object
  if (Array.isArray(docs)) {
    let transformedDocs = docs.map((item) => {
      if (item?.image) {
        item.image = `${config.server_url}/${config.category_directory}/${item.image}`
      }
      return item
    })
    docs = transformedDocs
  }

  next()
})

// Make Model
const CategoryModel = model('Category', CategorySchema)

// Export Model
export default CategoryModel

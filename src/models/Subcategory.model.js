// Required Packeges
import { Schema, Types, model } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import config from '../config/index.js'

const SubCategorySchema = Schema(
  {
    category: {
      type: Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    name: { type: String, required: true },
    image: String,
    description: String,
  },
  { timestamps: true, versionKey: false }
)

// Integrate MOngoose Unique Validoator Plugin
SubCategorySchema.plugin(uniqueValidator, {
  message: '{VALUE} Already Exists!',
})

// Post-middleware function
SubCategorySchema.post(/^find|^findOne|^findById|^save/, function (docs, next) {
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
const SubcategoryModel = model('SubCategory', SubCategorySchema)

// Export Model
export default SubcategoryModel

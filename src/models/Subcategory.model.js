// Required Packeges
import { Schema, Types, model } from 'mongoose'

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

// Make Model
const SubcategoryModel = model('SubCategory', SubCategorySchema)

// Export Model
export default SubcategoryModel

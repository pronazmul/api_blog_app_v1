// Required Packeges
import { Schema, model } from 'mongoose'

const CategorySchema = Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
  },
  { timestamps: true, versionKey: false }
)

// Make Model
const CategoryModel = model('Category', CategorySchema)

// Export Model
export default CategoryModel

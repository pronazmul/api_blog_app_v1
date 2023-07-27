// Required Packeges
import { Schema, model } from 'mongoose'

const CategorySchema = Schema(
  {
    title: { type: String },
    description: { type: String },
    image: { type: String },
    subCategories: [
      {
        name: String,
        image: String,
        description: String,
      },
    ],
  },
  { timestamps: true, versionKey: false }
)

// Make Model
const CategoryModel = model('Category', CategorySchema)

// Export Model
export default CategoryModel

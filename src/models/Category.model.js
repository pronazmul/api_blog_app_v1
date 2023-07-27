// Required Packeges
import { Schema, model } from 'mongoose'

const CategorySchema = Schema({}, { timestamps: true, versionKey: false })

// Make Model
const CategoryModel = model('Category', CategorySchema)

// Export Model
export default CategoryModel

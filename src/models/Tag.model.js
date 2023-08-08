// Required Packeges
import { Schema, model } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const TagSchema = Schema(
  {
    name: { type: String, unique: true, required: true },
    blogCount: { type: Number, default: 0 },
  },
  { timestamps: true, versionKey: false }
)

// Integrate MOngoose Unique Validoator Plugin
TagSchema.plugin(uniqueValidator, {
  message: '{VALUE} Already Exists!',
})

// Static Functions
TagSchema.statics.incrementBlogCount = function (id) {
  return this.findOneAndUpdate({ _id: id }, { $inc: { blogCount: 1 } })
}

// Make Model
const TagModel = model('Tag', TagSchema)

// Export Model
export default TagModel

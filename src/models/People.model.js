// Required Packeges
import { Schema, model } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import { hash } from 'bcrypt'
import config from '../config/index.js'

const peopleSchema = Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: { type: String },
    mobile: { type: String },
    dob: Date,
    avatar: {
      type: String,
      default: 'demo.jpg',
    },
    roles: [{ type: String, enum: ['admin', 'user'], default: 'user' }],
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    age: Number,
    city: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

// Integrate MOngoose Unique Validoator Plugin
peopleSchema.plugin(uniqueValidator, {
  message: '{VALUE} Already Exists!',
})

peopleSchema.pre('save', async function (next) {
  this.roles = ['user']
  this.password = await hash(this.password, 10)
})

peopleSchema.methods.getUserInfo = async function () {
  return {
    _id: this?._id,
    name: this?.name,
    email: this?.email,
    mobile: this?.mobile,
    roles: this?.roles,
    avatar: this.avatar,
    status: this?.status,
  }
}

// Post-middleware function
peopleSchema.post(/^find|^findOne|^findById/, function (docs, next) {
  // Check the response is object
  if (typeof docs === 'object' && !Array.isArray(docs) && docs?.avatar) {
    docs.avatar = `${config.server_url}/${config.user_directory}/${docs.avatar}`
  }
  // Check IF the response is object
  if (Array.isArray(docs)) {
    let transformedDocs = docs.map((item) => {
      if (item?.avatar) {
        return {
          ...item,
          avatar: `${config.server_url}/${config.user_directory}/${item.avatar}`,
        }
      } else {
        return item
      }
    })
    docs = transformedDocs
  }

  next()
})

// Make User Modelresult
const PeopleModel = model('People', peopleSchema)

// Export User Model
export default PeopleModel

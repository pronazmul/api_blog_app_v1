// Required Packeges
import { Schema, model, Types } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import { hash } from 'bcrypt'
import config from '../config/index.js'

const PeopleSchema = Schema(
  {
    role: { type: Types.ObjectId, ref: 'Role', required: true },
    name: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: { type: String },
    avatar: { type: String },
    phone: { type: String },
    dob: Date,
    bio: String,
    followers: { type: Number, default: 0 },
    following: { type: Number, default: 0 },
    address: {
      street: String,
      postCode: String,
      city: String,
      country: String,
    },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

// Integrate MOngoose Unique Validoator Plugin
PeopleSchema.plugin(uniqueValidator, {
  message: '{VALUE} Already Exists!',
})

// Pre-Middleware Function
PeopleSchema.pre('save', async function (next) {
  this.password = await hash(this.password, 10)
})

// Post-middleware function
PeopleSchema.post(/^find|^findOne|^findById/, function (docs, next) {
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

// Static Functions
PeopleSchema.statics.incrementFollower = function (id) {
  return this.findOneAndUpdate({ _id: id }, { $inc: { followers: 1 } })
}
PeopleSchema.statics.decrementFollower = function (id) {
  return this.findOneAndUpdate({ _id: id }, { $inc: { followers: -1 } })
}
PeopleSchema.statics.incrementFollowing = function (id) {
  return this.findOneAndUpdate({ _id: id }, { $inc: { following: 1 } })
}
PeopleSchema.statics.decrementFollowing = function (id) {
  return this.findOneAndUpdate({ _id: id }, { $inc: { following: -1 } })
}

// Make User Modelresult
const PeopleModel = model('People', PeopleSchema)

// Export User Model
export default PeopleModel

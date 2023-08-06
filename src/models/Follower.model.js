// Required Packeges
import { Schema, model, Types } from 'mongoose'
import config from '../config/index.js'
import GlobalConst from '../consts/global.const.js'

const FollowerSchema = Schema(
  {
    follower: { type: Types.ObjectId, ref: 'People', required: true },
    following: { type: Types.ObjectId, ref: 'People', required: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
)

// Post-middleware function
FollowerSchema.post(/^find|^findOne|^findById/, function (docs, next) {
  // http checker expression
  let { startWithHttpExp } = GlobalConst.regexp

  // Check IF the response is An Array
  if (Array.isArray(docs)) {
    let transformedDocs = docs.map((item) => {
      if (
        item?.follower?.avatar &&
        !startWithHttpExp.test(item?.follower?.avatar)
      ) {
        item.follower.avatar = `${config.server_url}/${config.user_directory}/${item.follower.avatar}`
      }

      if (
        item?.following?.avatar &&
        !startWithHttpExp.test(item?.following?.avatar)
      ) {
        item.following.avatar = `${config.server_url}/${config.user_directory}/${item.following.avatar}`
      }

      return item
    })
    docs = transformedDocs
  }

  next()
})

// Make Model
const FollowerModel = model('Follower', FollowerSchema)

// Export Model
export default FollowerModel

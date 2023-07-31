import UserConst from '../consts/user.const.js'
import GlobalUtils from '../utils/global.utils.js'
import MongooseUtils from '../utils/mongoose.utils.js'
import LikeModel from '../models/Like.model.js'

// Initialize Module
const LikeService = {}

LikeService.create = async (payload) => {
  try {
    let newData = new LikeModel(payload)
    let result = await newData.save()
    return result
  } catch (error) {
    throw error
  }
}

LikeService.findOneById = async (id) => {
  try {
    let query = { _id: id }
    let projection = { password: 0, createdAt: 0, updatedAt: 0 }
    let result = await LikeModel.findById(query, projection)
    // .populate('category')
    // .populate('tags')
    return result
  } catch (error) {
    throw error
  }
}

LikeService.find = async (reqQuery) => {
  const { page, limit, skip, sortBy, sortOrder } =
    GlobalUtils.calculatePagination(reqQuery)

  const query = MongooseUtils.searchCondition(
    reqQuery,
    UserConst.searchOptions,
    UserConst.filterOptions
  )
  const sort = { [sortBy]: sortOrder }
  const projection = { password: 0 }
  try {
    const result = await LikeModel.find(query, projection)
      // .populate('user')
      .sort(sort)
      .skip(skip)
      .limit(limit)
    const total = await LikeModel.countDocuments(query)
    return { data: result, meta: { page, limit, total } }
  } catch (error) {
    throw error
  }
}

LikeService.updateOneById = async (id, payload) => {
  try {
    let query = { _id: id }
    let options = { new: true, select: 'name email mobile avatar roles' }
    const result = await LikeModel.findOneAndUpdate(query, payload, options)
    return result
  } catch (error) {
    throw error
  }
}

LikeService.deleteOneById = async (id) => {
  try {
    let query = { _id: id }
    let result = await LikeModel.findOneAndDelete(query)
    return result
  } catch (error) {
    throw error
  }
}

export default LikeService

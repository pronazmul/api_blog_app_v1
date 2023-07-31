import UserConst from '../consts/user.const.js'
import GlobalUtils from '../utils/global.utils.js'
import MongooseUtils from '../utils/mongoose.utils.js'
import CommentModel from '../models/Comment.model.js'

// Initialize Module
const CommentService = {}

CommentService.create = async (payload) => {
  try {
    let newData = new CommentModel(payload)
    let result = await newData.save()
    return result
  } catch (error) {
    throw error
  }
}

CommentService.findOneById = async (id) => {
  try {
    let query = { _id: id }
    let projection = { password: 0, createdAt: 0, updatedAt: 0 }
    let result = await CommentModel.findById(query, projection)
    // .populate('category')
    // .populate('tags')
    return result
  } catch (error) {
    throw error
  }
}

CommentService.find = async (reqQuery) => {
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
    const result = await CommentModel.find(query, projection)
      // .populate('user')
      .sort(sort)
      .skip(skip)
      .limit(limit)
    const total = await CommentModel.countDocuments(query)
    return { data: result, meta: { page, limit, total } }
  } catch (error) {
    throw error
  }
}

CommentService.updateOneById = async (id, payload) => {
  try {
    let query = { _id: id }
    let options = { new: true, select: 'name email mobile avatar roles' }
    const result = await CommentModel.findOneAndUpdate(query, payload, options)
    return result
  } catch (error) {
    throw error
  }
}

CommentService.deleteOneById = async (id) => {
  try {
    let query = { _id: id }
    let result = await CommentModel.findOneAndDelete(query)
    return result
  } catch (error) {
    throw error
  }
}

export default CommentService

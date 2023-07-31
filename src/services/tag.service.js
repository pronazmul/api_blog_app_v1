import UserConst from '../consts/user.const.js'
import GlobalUtils from '../utils/global.utils.js'
import MongooseUtils from '../utils/mongoose.utils.js'
import TagModel from '../models/Tag.model.js'

// Initialize Module
const TagService = {}

TagService.create = async (payload) => {
  try {
    let newData = new TagModel(payload)
    let result = await newData.save()
    return result
  } catch (error) {
    throw error
  }
}

TagService.findOneById = async (id) => {
  try {
    let query = { _id: id }
    let projection = { password: 0, createdAt: 0, updatedAt: 0 }
    let result = await TagModel.findById(query, projection)
    // .populate('category')
    // .populate('tags')
    return result
  } catch (error) {
    throw error
  }
}

TagService.find = async (reqQuery) => {
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
    const result = await TagModel.find(query, projection)
      // .populate('user')
      .sort(sort)
      .skip(skip)
      .limit(limit)
    const total = await TagModel.countDocuments(query)
    return { data: result, meta: { page, limit, total } }
  } catch (error) {
    throw error
  }
}

TagService.updateOneById = async (id, payload) => {
  try {
    let query = { _id: id }
    let options = { new: true, select: 'name email mobile avatar roles' }
    const result = await TagModel.findOneAndUpdate(query, payload, options)
    return result
  } catch (error) {
    throw error
  }
}

TagService.deleteOneById = async (id) => {
  try {
    let query = { _id: id }
    let result = await TagModel.findOneAndDelete(query)
    return result
  } catch (error) {
    throw error
  }
}

export default TagService

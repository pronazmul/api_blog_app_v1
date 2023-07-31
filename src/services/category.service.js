import UserConst from '../consts/user.const.js'
import GlobalUtils from '../utils/global.utils.js'
import MongooseUtils from '../utils/mongoose.utils.js'
import CategoryModel from '../models/Category.model.js'

// Initialize Module
const CategoryService = {}

CategoryService.create = async (payload) => {
  try {
    let newData = new CategoryModel(payload)
    let result = await newData.save()
    return result
  } catch (error) {
    throw error
  }
}

CategoryService.findOneById = async (id) => {
  try {
    let query = { _id: id }
    let projection = { password: 0, createdAt: 0, updatedAt: 0 }
    let result = await CategoryModel.findById(query, projection)
    // .populate('category')
    // .populate('tags')
    return result
  } catch (error) {
    throw error
  }
}

CategoryService.find = async (reqQuery) => {
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
    const result = await CategoryModel.find(query, projection)
      // .populate('user')
      .sort(sort)
      .skip(skip)
      .limit(limit)
    const total = await CategoryModel.countDocuments(query)
    return { data: result, meta: { page, limit, total } }
  } catch (error) {
    throw error
  }
}

CategoryService.updateOneById = async (id, payload) => {
  try {
    let query = { _id: id }
    let options = { new: true, select: 'name email mobile avatar roles' }
    const result = await CategoryModel.findOneAndUpdate(query, payload, options)
    return result
  } catch (error) {
    throw error
  }
}

CategoryService.deleteOneById = async (id) => {
  try {
    let query = { _id: id }
    let result = await CategoryModel.findOneAndDelete(query)
    return result
  } catch (error) {
    throw error
  }
}

export default CategoryService

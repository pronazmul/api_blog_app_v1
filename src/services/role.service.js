import UserConst from '../consts/user.const.js'
import GlobalUtils from '../utils/global.utils.js'
import MongooseUtils from '../utils/mongoose.utils.js'
import RoleModel from '../models/Role.model.js'

// Initialize Module
const RoleService = {}

RoleService.create = async (payload) => {
  try {
    let newData = new RoleModel(payload)
    let result = await newData.save()
    return result
  } catch (error) {
    throw error
  }
}

RoleService.findOneById = async (id) => {
  try {
    let query = { _id: id }
    let projection = { password: 0, createdAt: 0, updatedAt: 0 }
    let result = await RoleModel.findById(query, projection)
    // .populate('category')
    // .populate('tags')
    return result
  } catch (error) {
    throw error
  }
}

RoleService.find = async (reqQuery) => {
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
    const result = await RoleModel.find(query, projection)
      // .populate('user')
      .sort(sort)
      .skip(skip)
      .limit(limit)
    const total = await RoleModel.countDocuments(query)
    return { data: result, meta: { page, limit, total } }
  } catch (error) {
    throw error
  }
}

RoleService.updateOneById = async (id, payload) => {
  try {
    let query = { _id: id }
    let options = { new: true, select: 'name email mobile avatar roles' }
    const result = await RoleModel.findOneAndUpdate(query, payload, options)
    return result
  } catch (error) {
    throw error
  }
}

RoleService.deleteOneById = async (id) => {
  try {
    let query = { _id: id }
    let result = await RoleModel.findOneAndDelete(query)
    return result
  } catch (error) {
    throw error
  }
}

export default RoleService

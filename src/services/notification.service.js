import UserConst from '../consts/user.const.js'
import GlobalUtils from '../utils/global.utils.js'
import MongooseUtils from '../utils/mongoose.utils.js'
import NotificationModel from '../models/Notification.model.js'

// Initialize Module
const NotificationService = {}

NotificationService.create = async (payload) => {
  try {
    let newData = new NotificationModel(payload)
    let result = await newData.save()
    return result
  } catch (error) {
    throw error
  }
}

NotificationService.findOneById = async (id) => {
  try {
    let query = { _id: id }
    let projection = { password: 0, createdAt: 0, updatedAt: 0 }
    let result = await NotificationModel.findById(query, projection)
    // .populate('category')
    // .populate('tags')
    return result
  } catch (error) {
    throw error
  }
}

NotificationService.find = async (reqQuery) => {
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
    const result = await NotificationModel.find(query, projection)
      // .populate('user')
      .sort(sort)
      .skip(skip)
      .limit(limit)
    const total = await NotificationModel.countDocuments(query)
    return { data: result, meta: { page, limit, total } }
  } catch (error) {
    throw error
  }
}

NotificationService.updateOneById = async (id, payload) => {
  try {
    let query = { _id: id }
    let options = { new: true, select: 'name email mobile avatar roles' }
    const result = await NotificationModel.findOneAndUpdate(
      query,
      payload,
      options
    )
    return result
  } catch (error) {
    throw error
  }
}

NotificationService.deleteOneById = async (id) => {
  try {
    let query = { _id: id }
    let result = await NotificationModel.findOneAndDelete(query)
    return result
  } catch (error) {
    throw error
  }
}

export default NotificationService

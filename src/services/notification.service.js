import GlobalUtils from '../utils/global.utils.js'
import MongooseUtils from '../utils/mongoose.utils.js'
import NotificationModel from '../models/Notification.model.js'
import NotificationConst from '../consts/notification.const.js'
import ProjectionConst from '../consts/projection.const.js'
import FollowerModel from '../models/Follower.model.js'

// Initialize Module
const NotificationService = {}

NotificationService.readNotification = async (id) => {
  try {
    let query = { _id: id }
    let payload = { readStatus: true }
    let options = { new: true, select: ProjectionConst.notification }
    let result = await NotificationModel.findOneAndUpdate(
      query,
      payload,
      options
    )
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
    NotificationConst.searchOptions,
    NotificationConst.filterOptions
  )
  const sort = { [sortBy]: sortOrder }
  const projection = ProjectionConst.notification
  try {
    const result = await NotificationModel.find(query, projection)
      .populate({ path: 'blog', select: ProjectionConst.notification_blog })
      .populate({
        path: 'creator',
        select: ProjectionConst.notification_creator,
      })
      .sort(sort)
      .skip(skip)
      .limit(limit)
    const total = await NotificationModel.countDocuments(query)

    return { data: result, meta: { page, limit, total } }
  } catch (error) {
    throw error
  }
}

NotificationService.triggerBlogNotification = async (creatorId, payload) => {
  try {
    let followers = await FollowerModel.find({ follower: creatorId }).lean()
    if (!followers?.length) return

    for (let item of followers) {
      await NotificationModel.create({
        ...payload,
        creator: creatorId,
        user: item?.following,
      })
    }
  } catch (error) {
    throw error
  }
}

NotificationService.makeNotification = async (payload) => {
  try {
    await NotificationModel.create(payload)
  } catch (error) {
    throw error
  }
}

export default NotificationService

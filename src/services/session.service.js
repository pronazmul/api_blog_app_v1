import SessionConst from '../consts/session.const.js'
import GlobalUtils from '../utils/global.utils.js'
import MongooseUtils from '../utils/mongoose.utils.js'
import SessionModel from './../models/Session.model.js'

const SessionService = {}

SessionService.create = async (payload) => {
  try {
    let newData = new SessionModel(payload)
    let data = await newData.save()
    return data
  } catch (error) {
    throw error
  }
}

SessionService.activeSessions = async (reqQuery) => {
  try {
    const { page, limit, skip, sortBy, sortOrder } =
      GlobalUtils.calculatePagination(reqQuery)

    const query = MongooseUtils.searchCondition(
      reqQuery,
      SessionConst.searchOptions,
      SessionConst.filterOptions
    )
    const sort = { [sortBy]: sortOrder }

    let data = await SessionModel.find(query).sort(sort).skip(skip).limit(limit)
    const total = await SessionModel.countDocuments(query)

    return { data: data, meta: { page, limit, total } }
  } catch (error) {
    throw error
  }
}

SessionService.deactivateSession = async (sessionId) => {
  try {
    let query = { _id: sessionId }
    let modified = { valid: false }
    let options = { new: true, select: '_id' }
    const data = await SessionModel.findOneAndUpdate(query, modified, options)

    return data
  } catch (error) {
    throw error
  }
}

export default SessionService

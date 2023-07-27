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

SessionService.activeSessions = async (userId) => {
  try {
    let query = { user: userId, valid: true }
    let sort = { updatedAt: -1 }
    let data = await SessionModel.find(query).sort(sort).lean()
    return data
  } catch (error) {
    throw error
  }
}

SessionService.deactivateSession = async (sessionId) => {
  try {
    console.log({ sessionId })
    let query = { _id: sessionId }
    let modified = { valid: false }
    let options = { new: true }
    const data = await SessionModel.findOneAndUpdate(query, modified, options)
    console.log({ data })
    return data
  } catch (error) {
    throw error
  }
}

export default SessionService

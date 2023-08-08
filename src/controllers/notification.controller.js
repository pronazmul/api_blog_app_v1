// External Modules:
import createError from 'http-errors'

// Internal Modules:
import GlobalUtils from '../utils/global.utils.js'
import NotificationService from '../services/notification.service.js'

// Initialize Module
const NotificationController = {}

NotificationController.readNotification = async (req, res, next) => {
  try {
    let data = await NotificationService.readNotification(req.params.id)
    let response = GlobalUtils.fromatResponse(
      data,
      'Notification Read Success!'
    )
    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}

NotificationController.allNotification = async (req, res, next) => {
  try {
    let reqQuery = { ...req.query, user: req.user._id, readStatus: false }
    let result = await NotificationService.find(reqQuery)
    let response = GlobalUtils.fromatResponse(
      result?.data,
      'All Notification Fetch Success!',
      result?.meta
    )
    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}

export default NotificationController

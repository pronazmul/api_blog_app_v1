// External Modules:
import createError from 'http-errors'

// Internal Modules:
import GlobalUtils from '../utils/global.utils.js'
import NotificationService from '../services/notification.service.js'

// Initialize Module
const NotificationController = {}

NotificationController.create = async (req, res, next) => {
  try {
    let data = await NotificationService.create(req.body)
    let response = GlobalUtils.fromatResponse(data, 'Blog Create Success!')
    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}

NotificationController.findOneById = async (req, res, next) => {
  try {
    let data = await NotificationService.findOneById(req.params.id)
    let response = GlobalUtils.fromatResponse(
      data,
      'Single Blog Fetch Success!'
    )
    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}

NotificationController.find = async (req, res, next) => {
  try {
    let result = await NotificationService.find(req.query)
    let response = GlobalUtils.fromatResponse(
      result?.data,
      'All Blogs Fetch success',
      result?.meta
    )
    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}

NotificationController.updateOneById = async (req, res, next) => {
  try {
    let id = req.params.id
    let data = req.body
    let result = NotificationService.updateOneById(id, data)

    let response = GlobalUtils.fromatResponse(result, 'Blog Update Success!')
    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}

NotificationController.deleteOneById = async (req, res, next) => {
  try {
    let id = req.params.id
    let result = NotificationService.deleteOneById(id)
    let response = GlobalUtils.fromatResponse(result, 'Blog Delete Success')
    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}

export default NotificationController

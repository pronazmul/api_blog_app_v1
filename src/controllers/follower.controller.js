// External Modules:
import createError from 'http-errors'

// Internal Modules:
import GlobalUtils from '../utils/global.utils.js'
import FollowerService from '../services/follower.service.js'

// Initialize Module
const FollowerController = {}

FollowerController.create = async (req, res, next) => {
  try {
    let data = await FollowerService.create(req.body)
    let response = GlobalUtils.fromatResponse(data, 'Blog Create Success!')
    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}

FollowerController.findOneById = async (req, res, next) => {
  try {
    let data = await FollowerService.findOneById(req.params.id)
    let response = GlobalUtils.fromatResponse(
      data,
      'Single Blog Fetch Success!'
    )
    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}

FollowerController.find = async (req, res, next) => {
  try {
    let result = await FollowerService.find(req.query)
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

FollowerController.updateOneById = async (req, res, next) => {
  try {
    let id = req.params.id
    let data = req.body
    let result = FollowerService.updateOneById(id, data)

    let response = GlobalUtils.fromatResponse(result, 'Blog Update Success!')
    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}

FollowerController.deleteOneById = async (req, res, next) => {
  try {
    let id = req.params.id
    let result = FollowerService.deleteOneById(id)
    let response = GlobalUtils.fromatResponse(result, 'Blog Delete Success')
    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}

export default FollowerController

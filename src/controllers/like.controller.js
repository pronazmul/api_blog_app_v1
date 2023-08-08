// External Modules:
import createError from 'http-errors'

// Internal Modules:
import GlobalUtils from '../utils/global.utils.js'
import LikeService from '../services/like.service.js'

// Initialize Module
const LikeController = {}

LikeController.find = async (req, res, next) => {
  try {
    let payload = { ...req.query, blog: req.params.id }
    let result = await LikeService.find(payload)
    let response = GlobalUtils.fromatResponse(
      result?.data,
      'All likes Fetch Success',
      result?.meta
    )
    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}

LikeController.like = async (req, res, next) => {
  try {
    let query = { user: req.user._id, blog: req.params.id }
    let result = await LikeService.like(query)
    let response = GlobalUtils.fromatResponse(result, 'Like Success!')
    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}

LikeController.unlike = async (req, res, next) => {
  try {
    let query = { user: req.user._id, blog: req.params.id }
    let result = await LikeService.unlike(query)
    let response = GlobalUtils.fromatResponse(result, 'Unlike Success!')
    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}

export default LikeController

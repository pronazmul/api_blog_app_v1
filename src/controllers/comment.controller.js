// External Modules:
import createError from 'http-errors'

// Internal Modules:
import GlobalUtils from '../utils/global.utils.js'
import CommentService from '../services/comment.service.js'

// Initialize Module
const CommentController = {}

CommentController.create = async (req, res, next) => {
  try {
    let payload = { ...req.body, blog: req.params.id }
    let data = await CommentService.create(payload)
    let response = GlobalUtils.fromatResponse(data, 'Comment Success!')
    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}

CommentController.find = async (req, res, next) => {
  try {
    let reqQuery = { ...req.query, blog: req.params.id }
    let result = await CommentService.find(reqQuery)
    let response = GlobalUtils.fromatResponse(
      result?.data,
      'All comments Blog Success!',
      result?.meta
    )
    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}

export default CommentController

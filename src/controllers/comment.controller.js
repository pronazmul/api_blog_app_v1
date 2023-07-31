// External Modules:
import createError from 'http-errors'

// Internal Modules:
import GlobalUtils from '../utils/global.utils.js'
import CommentService from '../services/comment.service.js'

// Initialize Module
const CommentController = {}

CommentController.create = async (req, res, next) => {
  try {
    let data = await CommentService.create(req.body)
    let response = GlobalUtils.fromatResponse(data, 'Blog Create Success!')
    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}

CommentController.findOneById = async (req, res, next) => {
  try {
    let data = await CommentService.findOneById(req.params.id)
    let response = GlobalUtils.fromatResponse(
      data,
      'Single Blog Fetch Success!'
    )
    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}

CommentController.find = async (req, res, next) => {
  try {
    let result = await CommentService.find(req.query)
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

CommentController.updateOneById = async (req, res, next) => {
  try {
    let id = req.params.id
    let data = req.body
    let result = CommentService.updateOneById(id, data)

    let response = GlobalUtils.fromatResponse(result, 'Blog Update Success!')
    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}

CommentController.deleteOneById = async (req, res, next) => {
  try {
    let id = req.params.id
    let result = CommentService.deleteOneById(id)
    let response = GlobalUtils.fromatResponse(result, 'Blog Delete Success')
    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}

export default CommentController

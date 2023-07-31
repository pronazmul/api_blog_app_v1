// External Modules:
import createError from 'http-errors'

// Internal Modules:
import GlobalUtils from '../utils/global.utils.js'
import BlogService from '../services/blog.service.js'

// Initialize Module
const BlogController = {}

BlogController.create = async (req, res, next) => {
  try {
    let data = await BlogService.create(req.body)
    let response = GlobalUtils.fromatResponse(data, 'Blog Create Success!')
    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}

BlogController.findOneById = async (req, res, next) => {
  try {
    let data = await BlogService.findOneById(req.params.id)
    let response = GlobalUtils.fromatResponse(
      data,
      'Single Blog Fetch Success!'
    )
    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}

BlogController.find = async (req, res, next) => {
  try {
    let result = await BlogService.find(req.query)
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

BlogController.updateOneById = async (req, res, next) => {
  try {
    let id = req.params.id
    let data = req.body
    let result = BlogService.updateOneById(id, data)

    let response = GlobalUtils.fromatResponse(result, 'Blog Update Success!')
    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}

BlogController.deleteOneById = async (req, res, next) => {
  try {
    let id = req.params.id
    let result = BlogService.deleteOneById(id)
    let response = GlobalUtils.fromatResponse(result, 'Blog Delete Success')
    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}

export default BlogController

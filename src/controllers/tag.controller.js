// External Modules:
import createError from 'http-errors'

// Internal Modules:
import GlobalUtils from '../utils/global.utils.js'
import TagService from '../services/tag.service.js'

// Initialize Module
const TagController = {}

TagController.create = async (req, res, next) => {
  try {
    let data = await TagService.create(req.body)
    let response = GlobalUtils.fromatResponse(data, 'Tag Create Success!')
    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}

TagController.findOneById = async (req, res, next) => {
  try {
    let data = await TagService.findOneById(req.params.id)
    let response = GlobalUtils.fromatResponse(data, 'Single Tag Fetch Success!')
    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}

TagController.find = async (req, res, next) => {
  try {
    let result = await TagService.find(req.query)
    let response = GlobalUtils.fromatResponse(
      result?.data,
      'All Tags Fetch success',
      result?.meta
    )
    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}

TagController.updateOneById = async (req, res, next) => {
  try {
    let id = req.params.id
    let data = req.body
    let result = await TagService.updateOneById(id, data)

    let response = GlobalUtils.fromatResponse(result, 'Tag Update Success!')
    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}



export default TagController

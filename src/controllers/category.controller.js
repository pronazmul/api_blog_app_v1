// External Modules:
import createError from 'http-errors'

// Internal Modules:
import GlobalUtils from '../utils/global.utils.js'
import CategoryService from '../services/category.service.js'

// Initialize Module
const CategoryController = {}

//-----------------CAtegories ----------------------

CategoryController.create = async (req, res, next) => {
  try {
    let payload = req.body

    if (req?.files[0]?.filename) {
      payload.image = req?.files[0]?.filename
    }

    let data = await CategoryService.create(payload)
    let response = GlobalUtils.fromatResponse(
      data,
      'Category Created successfully!'
    )
    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}

CategoryController.findOneById = async (req, res, next) => {
  try {
    let data = await CategoryService.findOneById(req.params.id)
    let response = GlobalUtils.fromatResponse(
      data,
      'Single Blog Fetch Success!'
    )
    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}

CategoryController.find = async (req, res, next) => {
  try {
    let result = await CategoryService.find(req.query)
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

CategoryController.updateOneById = async (req, res, next) => {
  try {
    let id = req.params.id
    let data = req.body
    let result = await CategoryService.updateOneById(id, data)

    let response = GlobalUtils.fromatResponse(result, 'Blog Update Success!')
    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}

///-----------------Sub CAtegories ----------------------

CategoryController.findAllSubCat = async (req, res, next) => {
  try {
    let result = await CategoryService.findAllSubCat(req.query)
    let response = GlobalUtils.fromatResponse(
      result?.data,
      'All Sub Categories Fetch success',
      result?.meta
    )
    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}

CategoryController.findSubCatById = async (req, res, next) => {
  try {
    let data = await CategoryService.findSubCatById(req.params.id)
    let response = GlobalUtils.fromatResponse(
      data,
      'Single Category Fetch Success!'
    )
    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}

CategoryController.updateSubCatById = async (req, res, next) => {
  try {
    let id = req.params.id
    let data = req.body
    let result = await CategoryService.updateSubCatById(id, data)
    let response = GlobalUtils.fromatResponse(result, 'SubCat Update Success!')
    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}

CategoryController.createSubCat = async (req, res, next) => {
  try {
    let payload = req.body

    if (req?.files[0]?.filename) {
      payload.image = req?.files[0]?.filename
    }

    let data = await CategoryService.createSubCat(payload)
    let response = GlobalUtils.fromatResponse(
      data,
      'SubCategory Created successfully!'
    )
    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}

export default CategoryController

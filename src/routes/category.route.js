// External Modules:
import { Router } from 'express'

// Middlewares
import ValidateMiddleware from '../middlewares/validate.middleware.js'
import CategoryController from '../controllers/category.controller.js'
import CategorySchema from './../schemas/category.schema.js'
import FileMiddleware from '../middlewares/file.middlewares.js'
import config from '../config/index.js'
import SubCategorySchema from './../schemas/subCategory.schema.js'

const router = Router()
const { validateRequest } = ValidateMiddleware
const { uploadFile, convertToWebp } = FileMiddleware

//-----------------Sub CAtegories ----------------------
/**
 * @description Create New SubCategories
 * @Route [POST]- /api/categories/subcategories
 * @Access protected - []
 * @returns {Objcet} - {}
 */
router.post(
  '/subcategories',
  uploadFile(['image'], config.category_directory, 'image', 1),
  convertToWebp(config.category_directory),
  validateRequest(SubCategorySchema.create),
  CategoryController.createSubCat
)

/**
 * @description Retrive All Subcategories
 * @Route [GET]- /api/categories/subcategories
 * @Access protected - []
 * @returns {Array} - JSON Array
 */
router.get(
  '/subcategories',
  validateRequest(SubCategorySchema.fetchAll),
  CategoryController.findAllSubCat
)

/**
 * @description Retrive SingleSubCategoriesByID
 * @Route [GET]- /api/categories/subcategories/:id
 * @Access protected - []
 * @returns {Object} - {}
 */
router.get('/subcategories/:id', CategoryController.findSubCatById)

/**
 * @description Retrive Update Subcat By ID
 * @Route [PUT]- /api/categories/subcategories/:id
 * @Access protected - []
 * @returns {Object} - {}
 */
router.put(
  '/subcategories/:id',
  validateRequest(SubCategorySchema.update),
  CategoryController.updateSubCatById
)

//-----------------Sub CAtegories ----------------------

/**
 * @description Retrive Single Category By ID
 * @Route [GET]- /api/categories/:id
 * @Access protected - []
 * @returns {Object} - Single Object
 */
router.get('/:id', CategoryController.findOneById)

/**
 * @description Update Category BY ID
 * @Route [PUT]- /api/categories/:id
 * @Access protected - []
 * @returns {Object} - Updated Data
 */
router.put(
  '/:id',
  validateRequest(CategorySchema.update),
  CategoryController.updateOneById
)

/**
 * @description Retrive All Data
 * @Route [GET]- /api/categories
 * @Access protected - []
 * @returns {Array} - All Filtered Data Array
 */
router.get(
  '/',
  validateRequest(CategorySchema.fetchAll),
  CategoryController.find
)

/**
 * @description Create New Category
 * @Route [POST]- /api/categories
 * @Access protected - []
 * @returns {Array} - Created Category Docs
 */
router.post(
  '/',
  uploadFile(['image'], config.category_directory, 'image', 1),
  convertToWebp(config.category_directory),
  validateRequest(CategorySchema.create),
  CategoryController.create
)

// Exports
export default router

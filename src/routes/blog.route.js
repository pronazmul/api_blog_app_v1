// External Modules:
import { Router } from 'express'

// Middlewares
import ValidateMiddleware from '../middlewares/validate.middleware.js'
import BlogController from '../controllers/blog.controller.js'
import BlogSchema from '../schemas/blog.schema.js'
import FileMiddleware from './../middlewares/file.middlewares.js'
import config from '../config/index.js'

const router = Router()
const { validateRequest } = ValidateMiddleware
const { uploadFile, convertToWebp } = FileMiddleware

/**
 * @description Retrive Single Data By ID
 * @Route [GET]- /api/blogs/:id
 * @Access protected - []
 * @returns {Object} - Single Object
 */
router.get('/:id', BlogController.findOneById)

/**
 * @description Update Data BY ID
 * @Route [PUT]- /api/blogs/:id
 * @Access protected - []
 * @returns {Object} - Updated Data
 */
router.put(
  '/:id',
  validateRequest(BlogSchema.update),
  BlogController.updateOneById
)

/**
 * @description Delete Data By ID
 * @Route [DELETE]- /api/blogs/:id
 * @Access protected - []
 * @returns {Object} - Deleted Status.
 */
router.delete('/:id', BlogController.deleteOneById)

/**
 * @description Retrive All Data
 * @Route [GET]- /api/blogs
 * @Access protected - []
 * @returns {Array} - All Filtered Data Array
 */
router.get('/', validateRequest(BlogSchema.fetchAll), BlogController.find)
/**
 * @description Create New Blog
 * @Route [POST]- /api/blogs
 * @Access protected - []
 * @returns {Object} - Created Blog Docs
 */
router.post(
  '/',
  uploadFile(['image'], config.blog_directory, 'image', 1),
  convertToWebp(config.blog_directory),
  validateRequest(BlogSchema.create),
  BlogController.create
)

// Exports
export default router

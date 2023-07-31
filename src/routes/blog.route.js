// External Modules:
import { Router } from 'express'

// Middlewares
import ValidateMiddleware from '../middlewares/validate.middleware.js'
import BlogController from '../controllers/blog.controller.js'

const router = Router()
const { validateRequest } = ValidateMiddleware

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
  // validateRequest(UserSchema.update),
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
 * @Route [GET]- /api/blogs?search=khulna&page=2&limit=1&sortBy=name&sortOrder=desc&username=nazmul&address.city=nazmul&active=true&abcd=fksdfj
 * @Access protected - []
 * @returns {Array} - All Filtered Data Array
 */
router.get(
  '/',
  // validateRequest(UserSchema.fetchAllUser),
  BlogController.find
)

// Exports
export default router

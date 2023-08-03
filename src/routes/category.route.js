// External Modules:
import { Router } from 'express'

// Middlewares
import ValidateMiddleware from '../middlewares/validate.middleware.js'
import CategoryController from '../controllers/category.controller.js'

const router = Router()
const { validateRequest } = ValidateMiddleware

/**
 * @description Retrive Single Data By ID
 * @Route [GET]- /api/categories/:id
 * @Access protected - []
 * @returns {Object} - Single Object
 */
router.get('/:id', CategoryController.findOneById)

/**
 * @description Update Data BY ID
 * @Route [PUT]- /api/categories/:id
 * @Access protected - []
 * @returns {Object} - Updated Data
 */
router.put(
  '/:id',
  // validateRequest(UserSchema.update),
  CategoryController.updateOneById
)

/**
 * @description Delete Data By ID
 * @Route [DELETE]- /api/categories/:id
 * @Access protected - []
 * @returns {Object} - Deleted Status.
 */
router.delete('/:id', CategoryController.deleteOneById)

/**
 * @description Retrive All Data
 * @Route [GET]- /api/categories?search=khulna&page=2&limit=1&sortBy=name&sortOrder=desc&username=nazmul&address.city=nazmul&active=true&abcd=fksdfj
 * @Access protected - []
 * @returns {Array} - All Filtered Data Array
 */
router.get(
  '/',
  // validateRequest(UserSchema.fetchAllUser),
  CategoryController.find
)

router.post(
  '/',
  // validateRequest(UserSchema.fetchAllUser),
  CategoryController.create
)

// Exports
export default router

// External Modules:
import { Router } from 'express'

// Middlewares
import ValidateMiddleware from '../middlewares/validate.middleware.js'
import TagController from '../controllers/tag.controller.js'

const router = Router()
const { validateRequest } = ValidateMiddleware

/**
 * @description Retrive Single Data By ID
 * @Route [GET]- /api/tags/:id
 * @Access protected - []
 * @returns {Object} - Single Object
 */
router.get('/:id', TagController.findOneById)

/**
 * @description Update Data BY ID
 * @Route [PUT]- /api/tags/:id
 * @Access protected - []
 * @returns {Object} - Updated Data
 */
router.put(
  '/:id',
  // validateRequest(UserSchema.update),
  TagController.updateOneById
)

/**
 * @description Delete Data By ID
 * @Route [DELETE]- /api/tags/:id
 * @Access protected - []
 * @returns {Object} - Deleted Status.
 */
router.delete('/:id', TagController.deleteOneById)

/**
 * @description Retrive All Data
 * @Route [GET]- /api/tags?search=khulna&page=2&limit=1&sortBy=name&sortOrder=desc&username=nazmul&address.city=nazmul&active=true&abcd=fksdfj
 * @Access protected - []
 * @returns {Array} - All Filtered Data Array
 */
router.get(
  '/',
  // validateRequest(UserSchema.fetchAllUser),
  TagController.find
)

// Exports
export default router

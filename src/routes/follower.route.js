// External Modules:
import { Router } from 'express'

// Middlewares
import ValidateMiddleware from '../middlewares/validate.middleware.js'
import FollowerController from '../controllers/follower.controller.js'

const router = Router()
const { validateRequest } = ValidateMiddleware

/**
 * @description Retrive Single Data By ID
 * @Route [GET]- /api/followers/:id
 * @Access protected - []
 * @returns {Object} - Single Object
 */
router.get('/:id', FollowerController.findOneById)

/**
 * @description Update Data BY ID
 * @Route [PUT]- /api/followers/:id
 * @Access protected - []
 * @returns {Object} - Updated Data
 */
router.put(
  '/:id',
  // validateRequest(UserSchema.update),
  FollowerController.updateOneById
)

/**
 * @description Delete Data By ID
 * @Route [DELETE]- /api/followers/:id
 * @Access protected - []
 * @returns {Object} - Deleted Status.
 */
router.delete('/:id', FollowerController.deleteOneById)

/**
 * @description Retrive All Data
 * @Route [GET]- /api/followers?search=khulna&page=2&limit=1&sortBy=name&sortOrder=desc&username=nazmul&address.city=nazmul&active=true&abcd=fksdfj
 * @Access protected - []
 * @returns {Array} - All Filtered Data Array
 */
router.get(
  '/',
  // validateRequest(UserSchema.fetchAllUser),
  FollowerController.find
)

// Exports
export default router

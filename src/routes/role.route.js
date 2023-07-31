// External Modules:
import { Router } from 'express'

// Middlewares
import ValidateMiddleware from '../middlewares/validate.middleware.js'
import RoleController from '../controllers/role.controller.js'

const router = Router()
const { validateRequest } = ValidateMiddleware

/**
 * @description Retrive Single Data By ID
 * @Route [GET]- /api/roles/:id
 * @Access protected - []
 * @returns {Object} - Single Object
 */
router.get('/:id', RoleController.findOneById)

/**
 * @description Update Data BY ID
 * @Route [PUT]- /api/roles/:id
 * @Access protected - []
 * @returns {Object} - Updated Data
 */
router.put(
  '/:id',
  // validateRequest(UserSchema.update),
  RoleController.updateOneById
)

/**
 * @description Delete Data By ID
 * @Route [DELETE]- /api/roles/:id
 * @Access protected - []
 * @returns {Object} - Deleted Status.
 */
router.delete('/:id', RoleController.deleteOneById)

/**
 * @description Retrive All Data
 * @Route [GET]- /api/roles?search=khulna&page=2&limit=1&sortBy=name&sortOrder=desc&username=nazmul&address.city=nazmul&active=true&abcd=fksdfj
 * @Access protected - []
 * @returns {Array} - All Filtered Data Array
 */
router.get(
  '/',
  // validateRequest(UserSchema.fetchAllUser),
  RoleController.find
)

// Exports
export default router

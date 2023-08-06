// External Modules:
import { Router } from 'express'

// Middlewares
import ValidateMiddleware from '../middlewares/validate.middleware.js'
import RoleController from '../controllers/role.controller.js'
import RoleSchema from './../schemas/role.schema.js'

const router = Router()
const { validateRequest } = ValidateMiddleware

/**
 * @description Activate Role BY ID
 * @Route [PUT]- /api/roles/active/:id
 * @Access protected - []
 * @returns {Object} - Updated Data
 */
router.put('/active/:id', RoleController.activate)
/**
 * @description Deactive Role BY ID
 * @Route [PUT]- /api/roles/deactive/:id
 * @Access protected - []
 * @returns {Object} - Updated Data
 */
router.put('/deactive/:id', RoleController.deactivate)

/**
 * @description Retrive Single Data By ID
 * @Route [GET]- /api/roles/:id
 * @Access protected - []
 * @returns {Object} - Single Object
 */
router.get('/:id', RoleController.findOneById)

/**
 * @description Retrive All Data
 * @Route [GET]- /api/roles
 * @Access protected - []
 * @returns {Array} - All Filtered Data Array
 */
router.get('/', validateRequest(RoleSchema.fetchAll), RoleController.find)

// Exports
export default router

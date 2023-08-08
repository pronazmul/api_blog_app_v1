// External Modules:
import { Router } from 'express'

// Middlewares
import ValidateMiddleware from '../middlewares/validate.middleware.js'
import TagController from '../controllers/tag.controller.js'
import TagSchema from './../schemas/tag.schema.js'

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
  validateRequest(TagSchema.update),
  TagController.updateOneById
)

/**
 * @description Retrive All Data
 * @Route [GET]- /api/tags
 * @Access protected - []
 * @returns {Array} - All Filtered Data Array
 */
router.get('/', validateRequest(TagSchema.fetchAll), TagController.find)

/**
 * @description Create Data
 * @Route [POST]- /api/tags
 * @Access protected - []
 * @returns {Object} - Created Object
 */
router.post('/', validateRequest(TagSchema.create), TagController.create)

// Exports
export default router

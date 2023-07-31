// External Modules:
import { Router } from 'express'

// Middlewares
import ValidateMiddleware from '../middlewares/validate.middleware.js'
import NotificationController from '../controllers/notification.controller.js'

const router = Router()
const { validateRequest } = ValidateMiddleware

/**
 * @description Retrive Single Data By ID
 * @Route [GET]- /api/notifications/:id
 * @Access protected - []
 * @returns {Object} - Single Object
 */
router.get('/:id', NotificationController.findOneById)

/**
 * @description Update Data BY ID
 * @Route [PUT]- /api/notifications/:id
 * @Access protected - []
 * @returns {Object} - Updated Data
 */
router.put(
  '/:id',
  // validateRequest(UserSchema.update),
  NotificationController.updateOneById
)

/**
 * @description Delete Data By ID
 * @Route [DELETE]- /api/notifications/:id
 * @Access protected - []
 * @returns {Object} - Deleted Status.
 */
router.delete('/:id', NotificationController.deleteOneById)

/**
 * @description Retrive All Data
 * @Route [GET]- /api/notifications?search=khulna&page=2&limit=1&sortBy=name&sortOrder=desc&username=nazmul&address.city=nazmul&active=true&abcd=fksdfj
 * @Access protected - []
 * @returns {Array} - All Filtered Data Array
 */
router.get(
  '/',
  // validateRequest(UserSchema.fetchAllUser),
  NotificationController.find
)

// Exports
export default router

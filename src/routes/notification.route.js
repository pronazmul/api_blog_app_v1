// External Modules:
import { Router } from 'express'

// Middlewares
import ValidateMiddleware from '../middlewares/validate.middleware.js'
import NotificationController from '../controllers/notification.controller.js'
import NotificationSchema from './../schemas/notification.schema.js'

const router = Router()
const { validateRequest } = ValidateMiddleware

/**
 * @description Read Notification
 * @Route [GET]- /api/notifications/:id
 * @Access protected - []
 * @returns {Object} - Single Object
 */
router.put('/:id', NotificationController.readNotification)

/**
 * @description All Notifications Of Logged In User
 * @Route [GET]- /api/notifications
 * @Access protected - []
 * @returns {Array} - JSON Array
 */
router.get(
  '/',
  validateRequest(NotificationSchema.fetchAll),
  NotificationController.allNotification
)

// Exports
export default router

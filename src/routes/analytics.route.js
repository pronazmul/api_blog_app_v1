// External Modules:
import { Router } from 'express'

// Middlewares
import ValidateMiddleware from '../middlewares/validate.middleware.js'
import AnalyticsSchema from '../schemas/analytics.schema.js'
import AnalyticsController from '../controllers/analytics.controller.js'

const router = Router()
const { validateRequest } = ValidateMiddleware

/**
 * @description Followers Analytics Daily
 * @Route [GET]- /api/analytics/followers/:userId
 * @Access protected - []
 * @returns {Array} - Followers Analytics Array
 */
router.get(
  '/followers/:id',
  validateRequest(AnalyticsSchema.followers),
  AnalyticsController.followers
)

// Exports
export default router

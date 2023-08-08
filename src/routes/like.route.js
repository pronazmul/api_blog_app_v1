// External Modules:
import { Router } from 'express'

// Middlewares
import ValidateMiddleware from '../middlewares/validate.middleware.js'
import LikeController from '../controllers/like.controller.js'
import LikeSchema from '../schemas/like.schema.js'

const router = Router()
const { validateRequest } = ValidateMiddleware

/**
 * @description Like By Blog ID
 * @Route [POST]- /api/likes/:id
 * @Access protected - []
 * @returns {Object} - Updated Data
 */
router.post('/like/:id', LikeController.like)

/**
 * @description Unlike By Blog ID
 * @Route [POST]- /api/likes/:id
 * @Access protected - []
 * @returns {Object} - Updated Data
 */
router.post('/unlike/:id', LikeController.unlike)

/**
 * @description Retrive All Data
 * @Route [GET]- /api/likes/:blogID
 * @Access protected - []
 * @returns {Array} - All Filtered Data Array
 */
router.get('/:id', validateRequest(LikeSchema.fetchAll), LikeController.find)

// Exports
export default router

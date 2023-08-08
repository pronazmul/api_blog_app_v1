// External Modules:
import { Router } from 'express'

// Middlewares
import ValidateMiddleware from '../middlewares/validate.middleware.js'
import CommentController from '../controllers/comment.controller.js'
import CommentSchema from '../schemas/comment.schema.js'

const router = Router()
const { validateRequest } = ValidateMiddleware

/**
 * @description Make new Commment
 * @Route [GET]- /api/comments/:blogID
 * @Access protected - []
 * @returns {Object} - Single Comment
 */
router.post(
  '/:id',
  validateRequest(CommentSchema.create),
  CommentController.create
)

/**
 * @description Retrive All Coments
 * @Route [GET]- /api/comments/:blogID
 * @Access protected - []
 * @returns {Array} - All Filtered Data Array
 */
router.get(
  '/:id',
  validateRequest(CommentSchema.fetchAll),
  CommentController.find
)

// Exports
export default router

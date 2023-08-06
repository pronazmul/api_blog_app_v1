// External Modules:
import { Router } from 'express'

// Middlewares
import ValidateMiddleware from '../middlewares/validate.middleware.js'
import FollowerController from '../controllers/follower.controller.js'
import FollowerSchema from '../schemas/follower.schema.js'

const router = Router()
const { validateRequest } = ValidateMiddleware

/**
 * @description Follow User
 * @Route [GET]- /api/followers/follow/:id
 * @Access protected - []
 * @returns {Obj} - {}
 */
router.post('/follow/:id', FollowerController.follow)

/**
 * @description Unfollow User
 * @Route [GET]- /api/followers/unfollow/:id
 * @Access protected - []
 * @returns {Obj} - {}
 */
router.post('/unfollow/:id', FollowerController.unfollow)

/**
 * @description Retrive All Follings
 * @Route [GET]- /api/followers/followings/:id
 * @Access protected - []
 * @returns {Array} - All Filtered Data Array
 */
router.get(
  '/followings/:id',
  validateRequest(FollowerSchema.fetchAll),
  FollowerController.following
)
/**
 * @description Retrive All Followers
 * @Route [GET]- /api/followers/:id
 * @Access protected - []
 * @returns {Array} - All Filtered Data Array
 */
router.get(
  '/:id',
  validateRequest(FollowerSchema.fetchAll),
  FollowerController.followers
)

// Exports
export default router

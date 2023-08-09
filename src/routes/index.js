import { Router } from 'express'
import AuthRoutes from './auth.route.js'
import UserRoutes from './user.route.js'
import BlogRoutes from './blog.route.js'
import CategoryRoutes from './category.route.js'
import RoleRoutes from './role.route.js'
import TagRoutes from './tag.route.js'
import LikeRoutes from './like.route.js'
import FollowerRoutes from './follower.route.js'
import NotificationsRoutes from './notification.route.js'
import CommentsRoutes from './comment.route.js'
import AnalyticsRoutes from './analytics.route.js'

// Middleware
import AuthMiddleware from '../middlewares/auth.middlewares.js'

const router = Router()

//Health Checker
router.use('/health', (_req, res) => res.status(200).json({ status: 'ok' }))

// Application Routes
router.use('/api/v1/auth', AuthRoutes)
router.use('/api/v1/roles', AuthMiddleware.authenticate, RoleRoutes)
router.use('/api/v1/users', AuthMiddleware.authenticate, UserRoutes)
router.use('/api/v1/followers', AuthMiddleware.authenticate, FollowerRoutes)
router.use('/api/v1/categories', AuthMiddleware.authenticate, CategoryRoutes)
router.use('/api/v1/tags', AuthMiddleware.authenticate, TagRoutes)
router.use('/api/v1/blogs', AuthMiddleware.authenticate, BlogRoutes)
router.use(
  '/api/v1/notifications',
  AuthMiddleware.authenticate,
  NotificationsRoutes
)
router.use('/api/v1/likes', AuthMiddleware.authenticate, LikeRoutes)
router.use('/api/v1/comments', AuthMiddleware.authenticate, CommentsRoutes)
router.use('/api/v1/analytics', AnalyticsRoutes)

// Module Exports
export default router

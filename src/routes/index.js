import { Router } from 'express'
import authRoutes from './auth.route.js'
import userRoutes from './user.route.js'
import AuthMiddleware from '../middlewares/auth.middlewares.js'

const router = Router()

//Health Checker
router.use('/health', (_req, res) => res.status(200).json({ status: 'ok' }))

// Application Routes
router.use('/api/v1/auth', authRoutes)
router.use('/api/v1/users', AuthMiddleware.authenticate, userRoutes)

// Module Exports
export default router

// External Modules:
import { Router } from 'express'

import UserSchema from '../schemas/user.schema.js'
import AuthController from './../controllers/auth.controller.js'
import AuthMiddleware from './../middlewares/auth.middlewares.js'
import ValidateMiddleware from './../middlewares/validate.middleware.js'

const router = Router()
const { authenticate } = AuthMiddleware
const { validateRequest } = ValidateMiddleware

/**
 * @description Retrive All Logged In user's Sessions
 * @Route [GET]- /api/auth/sessions/:userId
 * @Access Public
 * @returns {Array} - All Active Session
 */
router.get('/sessions/:userId', authenticate, AuthController.activeSessions)

/**
 * @description Deactive Session by Sessin Id
 * @Route [PUT]- /api/auth/sessions/:sessionId
 * @Access Public
 * @returns {Object} - Deactivate Session Details
 */
router.put('/sessions/:sessionId', authenticate, AuthController.deactiveSession)

/**
 * @description Register A New User
 * @Route [POST]- /api/auth/register
 * @Access Public
 * @returns {Object} - Created User.
 */
router.post(
  '/register',
  // validateRequest(UserSchema.create),
  AuthController.register
)
/**
 * @description User Login
 * @Route [POST]- /api/auth/login
 * @Access Public
 * @returns {Object} - Logged in User.
 */
router.post('/login', validateRequest(UserSchema.login), AuthController.login)
/**
 * @description Logout User
 * @Route [POST]- /api/users/auth/logout
 * @Access Private
 * @returns {Object} - logout
 */
router.get('/logout', authenticate, AuthController.logout)
/**
 * @description Retrive Logged User Information
 * @Route [GET]- /api/auth/login_info
 * @Access Public
 * @returns {Object} - Logged in User Data
 */
router.get('/login_info', authenticate, AuthController.loggedInInfo)

// Exports
export default router

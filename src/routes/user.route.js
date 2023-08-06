// External Modules:
import { Router } from 'express'

// Middlewares
import UserSchema from '../schemas/user.schema.js'
import ValidateMiddleware from '../middlewares/validate.middleware.js'
import UserController from './../controllers/user.controller.js'
import FileMiddleware from '../middlewares/file.middlewares.js'
import config from '../config/index.js'

const router = Router()
const { validateRequest } = ValidateMiddleware

/**
 * @description Update user Roles By UserID
 * @Route [PUT]- /api/users/roles/:userID
 * @Access protected - [admin]
 * @returns {Object} - Updated User.
 */
router.put(
  '/roles/:id',
  validateRequest(UserSchema.updateRoles),
  UserController.updateRoles
)

/**
 * @description Update User Password
 * @Route [PUT]- /api/users/password/:userID
 * @Access protected - [user, admin]
 * @returns {Object} - Updated User Docs
 */
router.put(
  '/password/:id',
  validateRequest(UserSchema.updatePassword),
  UserController.updatePassword
)

/**
 * @description Activate User By ID
 * @Route [PUT]- /api/users/activate/:userID
 * @Access protected - [user, admin]
 * @returns {Object} - Activate User Docs
 */
router.put('/activate/:id', UserController.activate)

/**
 * @description deactivate User By ID
 * @Route [PUT]- /api/users/deactivate/:userID
 * @Access protected - [user, admin]
 * @returns {Object} - DeActivate User Docs
 */
router.put('/deactivate/:id', UserController.deactivate)

/**
 * @description Upload Avatar By UserID.
 * @Route [POST]- /api/users/:userID/upload
 * @Access protected - logged in user only
 * @returns {Object} - Updated User Information and JWT Token after modifing avatar url.
 */
router.post(
  '/:id/upload',
  FileMiddleware.uploadFile(['image'], config.user_directory, 'avatar', 1),
  FileMiddleware.convertToWebp(config.user_directory),
  UserController.avatarUpload
)

/**
 * @description Delete User By UserID ***
 * @Route [DELETE]- /api/users/:userID
 * @Access protected - [admin]
 * @returns {Object} - Deleted Status.
 */
router.delete('/:id', UserController.deleteUser)

/**
 * @description Retrive Single User Info By UserID
 * @Route [GET]- /api/users/:userID
 * @Access protected - [admin]
 * @returns {Object} - Single User Object
 */
router.get('/:id', UserController.getSingleUser)

/**
 * @description Update user By UserID
 * @Route [PUT]- /api/users/:userID
 * @Access protected - [user, admin]
 * @returns {Object} - Updated User.
 */
router.put(
  '/:id',
  validateRequest(UserSchema.update),
  UserController.updateUser
)

/**
 * @description Retrive All Users
 * @Route [GET]- /api/users
 * @Access protected - [admin]
 * @returns {Array} - All User Array.
 */
router.get(
  '/',
  validateRequest(UserSchema.fetchAllUser),
  UserController.allUsers
)

// Exports
export default router

// External Modules:
import createError from 'http-errors'

// Internal Modules:
import FilesUtils from './../utils/files.utils.js'
import GlobalUtils from './../utils/global.utils.js'
import UserService from '../services/user.service.js'
import UserConst from '../consts/user.const.js'
import config from '../config/index.js'

// Initialize Module
const UserController = {}

UserController.getSingleUser = async (req, res, next) => {
  try {
    let data = await UserService.findOneById(req.params.id)
    let response = GlobalUtils.fromatResponse(
      data,
      'Single User Fetch success!'
    )
    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}

UserController.allUsers = async (req, res, next) => {
  try {
    let result = await UserService.find(req.query)
    let response = GlobalUtils.fromatResponse(
      result?.data,
      'All User Fetch success',
      result?.meta
    )
    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}

UserController.updateUser = async (req, res, next) => {
  try {
    let id = req.params.id
    let payload = GlobalUtils.fieldsFromObject(req.body, UserConst.updateFields)

    let result = await UserService.updateOneById(id, payload)
    let response = GlobalUtils.fromatResponse(result, 'User Update Success!')
    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}

UserController.updatePassword = async (req, res, next) => {
  try {
    let id = req.params.id
    const { currentPassword, newPassword } = req.body
    const result = await UserService.updatePassowrdById(
      id,
      currentPassword,
      newPassword
    )

    let response = GlobalUtils.fromatResponse(result, 'Password Updated!')
    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}

UserController.updateRoles = async (req, res, next) => {
  try {
    let id = req.params.id
    let payload = req.query
    const result = await UserService.updateOneById(id, payload)

    let response = GlobalUtils.fromatResponse(result, 'Role Updated!')
    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}
UserController.activate = async (req, res, next) => {
  try {
    let id = req.params.id
    const result = await UserService.activate(id)
    let response = GlobalUtils.fromatResponse(result, 'User Activated!')
    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}
UserController.deactivate = async (req, res, next) => {
  try {
    let id = req.params.id
    const result = await UserService.deactivate(id)
    let response = GlobalUtils.fromatResponse(result, 'User Deactivated!')
    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}

UserController.deleteUser = async (req, res, next) => {
  try {
    let id = req.params.id
    let result = UserService.deleteOneById(id)
    let response = GlobalUtils.fromatResponse(result, 'User Delete Success')
    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}

UserController.avatarUpload = async (req, res, next) => {
  try {
    let id = req.params.id
    let filename = req.files?.length ? req.files[0].filename : null

    if (!filename) {
      return next(createError(422, 'No Avatar Found!'))
    }

    // If Current User Has Avatar Remove That First
    const currentUser = await UserService.findOneById(id)
    if (currentUser?.avatar) {
      FilesUtils.removeOne(
        config.user_directory,
        currentUser.avatar.split('/').pop()
      )
    }
    const result = await UserService.updateOneById(id, { avatar: filename })
    let response = GlobalUtils.fromatResponse(result, 'Avatar Upload Success!')

    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}

export default UserController

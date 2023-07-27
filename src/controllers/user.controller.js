// External Modules:
import createError from 'http-errors'

// Internal Modules:
import FilesUtils from './../utils/files.utils.js'
import GlobalUtils from './../utils/global.utils.js'
import UserService from '../services/user.service.js'

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
    let result = UserService.find(req.query)
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
    let data = req.body
    let result = UserService.updateOneById(id, data)

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
    const result = UserService.updatePassowrdById(
      id,
      currentPassword,
      newPassword
    )
    let response = GlobalUtils.fromatResponse(
      result,
      'Password Changed Successfully!'
    )
    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}

UserController.updateRoles = async (req, res, next) => {
  try {
    let id = req.params.id
    let data = req.body.roles
    const result = UserService.updateOneById(id, data)
    let response = GlobalUtils.fromatResponse(result, 'Password Updated!')
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
    const currentUser = await UserService.findOneById(id)
    if (currentUser?.avatar) {
      FilesUtils.removeOne('users', currentUser.avatar.split('/').pop())
    }
    const result = await UserService.updateOneById(id, { avatar: filename })
    let response = GlobalUtils.fromatResponse(result, 'Avatar Upload Success!')
    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}

export default UserController

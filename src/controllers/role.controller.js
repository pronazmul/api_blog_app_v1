// External Modules:
import createError from 'http-errors'

// Internal Modules:
import GlobalUtils from '../utils/global.utils.js'
import RoleService from '../services/role.service.js'

// Initialize Module
const RoleController = {}

RoleController.findOneById = async (req, res, next) => {
  try {
    let data = await RoleService.findOneById(req.params.id)
    let response = GlobalUtils.fromatResponse(
      data,
      'Single Blog Fetch Success!'
    )
    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}

RoleController.find = async (req, res, next) => {
  try {
    let result = await RoleService.find(req.query)
    let response = GlobalUtils.fromatResponse(
      result?.data,
      'All Roles Fetch Success',
      result?.meta
    )
    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}

RoleController.activate = async (req, res, next) => {
  try {
    let id = req.params.id
    let result = await RoleService.activateRole(id)

    let response = GlobalUtils.fromatResponse(result, 'Role Activated!')
    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}

RoleController.deactivate = async (req, res, next) => {
  try {
    let id = req.params.id
    let result = await RoleService.deactivateRole(id)
    let response = GlobalUtils.fromatResponse(result, 'Role Deactivated!')
    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}

export default RoleController

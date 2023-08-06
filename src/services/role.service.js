import GlobalUtils from '../utils/global.utils.js'
import MongooseUtils from '../utils/mongoose.utils.js'
import RoleModel from '../models/Role.model.js'
import RoleConst from '../consts/role.const.js'
import ProjectionConst from '../consts/projection.const.js'

// Initialize Module
const RoleService = {}

RoleService.findOneById = async (id) => {
  try {
    let query = { _id: id }
    let result = await RoleModel.findById(query, ProjectionConst.role)
    return result
  } catch (error) {
    throw error
  }
}

RoleService.find = async (reqQuery) => {
  const { page, limit, skip, sortBy, sortOrder } =
    GlobalUtils.calculatePagination(reqQuery)
  const query = MongooseUtils.searchCondition(reqQuery, RoleConst.searchOptions)
  const sort = { [sortBy]: sortOrder }

  try {
    const result = await RoleModel.find(query, ProjectionConst.role)
      .sort(sort)
      .skip(skip)
      .limit(limit)

    const total = await RoleModel.countDocuments(query)
    return { data: result, meta: { page, limit, total } }
  } catch (error) {
    throw error
  }
}

RoleService.activateRole = async (id) => {
  try {
    let query = { _id: id, active: false }
    let payload = { active: true }
    let options = { new: true, select: ProjectionConst.role }
    const result = await RoleModel.findOneAndUpdate(query, payload, options)
    if (!result) throw Error('Failed to Activate!')
    return result
  } catch (error) {
    throw error
  }
}

RoleService.deactivateRole = async (id) => {
  try {
    let query = { _id: id, active: true }
    let payload = { active: false }
    let options = { new: true, select: ProjectionConst.role }
    const result = await RoleModel.findOneAndUpdate(query, payload, options)
    if (!result) throw Error('Failed to Deactivate!')
    return result
  } catch (error) {
    throw error
  }
}

RoleService.seed = async () => {
  try {
    let result = await RoleModel.countDocuments()
    if (result) return
    await RoleModel.create(RoleConst.rolesData)
  } catch (error) {
    throw error
  }
}

RoleService.default = async () => {
  try {
    let result = await RoleModel.findOne({ name: RoleConst.defaultRole }, '_id')
    return result
  } catch (error) {
    throw error
  }
}

export default RoleService

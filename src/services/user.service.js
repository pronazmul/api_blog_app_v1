import bcrypt from 'bcrypt'
import UserConst from '../consts/user.const.js'
import GlobalUtils from '../utils/global.utils.js'
import MongooseUtils from '../utils/mongoose.utils.js'
import UserModel from './../models/People.model.js'
import ProjectionConst from '../consts/projection.const.js'

// Initialize Module
const UserService = {}

UserService.findOneById = async (id) => {
  try {
    let query = { _id: id }
    let user = await UserModel.findById(query, ProjectionConst.user).populate({
      path: 'role',
      select: ProjectionConst.role_with_user,
    })
    return user
  } catch (error) {
    throw error
  }
}

UserService.find = async (reqQuery) => {
  const { page, limit, skip, sortBy, sortOrder } =
    GlobalUtils.calculatePagination(reqQuery)

  const query = MongooseUtils.searchCondition(
    reqQuery,
    UserConst.searchOptions,
    UserConst.filterOptions
  )
  const sort = { [sortBy]: sortOrder }
  try {
    const users = await UserModel.find(query, ProjectionConst.user)
      .populate({ path: 'role', select: ProjectionConst.role_with_user })
      .sort(sort)
      .skip(skip)
      .limit(limit)
    const total = await UserModel.countDocuments(query)
    return { data: users, meta: { page, limit, total } }
  } catch (error) {
    throw error
  }
}

UserService.updateOneById = async (id, payload) => {
  try {
    let query = { _id: id }
    let options = { new: true, select: ProjectionConst.user }
    const result = await UserModel.findOneAndUpdate(query, payload, options)

    console.log({ result })

    return result
  } catch (error) {
    throw error
  }
}

UserService.updatePassowrdById = async (id, oldPass, newPass) => {
  try {
    let query = { _id: id }
    let options = { new: true, select: ProjectionConst.user }

    const user = await UserModel.findById(query)
    let isMatch = await bcrypt.compare(oldPass, user?.password)

    if (user && isMatch) {
      const password = await bcrypt.hash(newPass, 10)
      let payload = {
        password,
      }
      let result = await UserModel.findOneAndUpdate(query, payload, options)
      return result
    } else {
      throw Error("Passowrd Dosen't Match!")
    }
  } catch (error) {
    throw error
  }
}

UserService.activate = async (id) => {
  try {
    let query = { _id: id, active: false }
    let payload = { active: true }
    let options = { new: true, select: ProjectionConst.user }
    const result = await UserModel.findOneAndUpdate(query, payload, options)
    if (!result) throw Error('Failed to Activate!')
    return result
  } catch (error) {
    throw error
  }
}

UserService.deactivate = async (id) => {
  try {
    let query = { _id: id, active: true }
    let payload = { active: false }
    let options = { new: true, select: ProjectionConst.user }
    const result = await UserModel.findOneAndUpdate(query, payload, options)
    if (!result) throw Error('Failed to Deactivate!')
    return result
  } catch (error) {
    throw error
  }
}

UserService.deleteOneById = async (id) => {
  try {
    let query = { _id: id }
    let result = await UserModel.findOneAndDelete(query)
    return result
  } catch (error) {
    throw error
  }
}

export default UserService

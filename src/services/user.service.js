import bcrypt from 'bcrypt'
import UserConst from '../consts/user.const.js'
import GlobalUtils from '../utils/global.utils.js'
import MongooseUtils from '../utils/mongoose.utils.js'
import UserModel from './../models/People.model.js'

// Initialize Module
const UserService = {}

UserService.create = async (payload) => {
  try {
    let newUser = new UserModel(payload)
    let user = await newUser.save()
    return user
  } catch (error) {
    throw error
  }
}

UserService.findOneById = async (id) => {
  try {
    let query = { _id: id }
    let projection = { password: 0, createdAt: 0, updatedAt: 0 }
    let user = await UserModel.findById(query, projection).populate('role')
    // let role = await RoleModel.findById({ _id: user.role })
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
  const projection = { password: 0 }
  try {
    const users = await UserModel.find(query, projection)
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
    let options = { new: true, select: 'name email mobile avatar roles' }
    const result = await UserModel.findOneAndUpdate(query, payload, options)
    return result
  } catch (error) {
    throw error
  }
}

UserService.updatePassowrdById = async (id, oldPass, newPass) => {
  try {
    let query = { _id: id }
    let options = { new: true }

    const user = await UserModel.findById(query)
    let isMatch = await bcrypt.compare(oldPass, user?.password)

    if (user && isMatch) {
      const password = bcrypt.hash(newPass)
      let updatedData = {
        password,
      }
      let result = await UserModel.findOneAndUpdate(query, updatedData, options)
      return result
    } else {
      throw "Passowrd dosen't Match!"
    }
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

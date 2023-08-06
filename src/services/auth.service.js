import { compare } from 'bcrypt'
import UserModel from '../models/People.model.js'
import createHttpError from 'http-errors'
import ProjectionConst from '../consts/projection.const.js'

// Initialize Module
const AuthService = {}

AuthService.login = async (payload) => {
  try {
    const { email, password } = payload

    let query = { email, active: true }
    let projection = ProjectionConst.userAuth

    let user = await UserModel.findOne(query, projection)
      .populate({
        path: 'role',
        select: ProjectionConst.role,
      })
      .lean()

    let match = await compare(password, user?.password)
    if (!user || !match) throw createHttpError(401, 'Authentication Failed!')

    // REMOVE USER PASS
    delete user?.password

    return user
  } catch (error) {
    console.log({ error })
    throw createHttpError(401, 'Authentication Failed!')
  }
}

AuthService.register = async (payload) => {
  try {
    let newUser = new UserModel(payload)
    let user = await newUser.save()

    let query = { _id: newUser._id }
    let projection = ProjectionConst.userAuth

    user = await UserModel.findOne(query, projection)
      .populate({
        path: 'role',
        select: ProjectionConst.role,
      })
      .lean()

    // REMOVE USER PASS
    delete user?.password

    return user
  } catch (error) {
    throw error
  }
}

export default AuthService

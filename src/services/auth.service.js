import { compare } from 'bcrypt'
import UserModel from '../models/People.model.js'
import createHttpError from 'http-errors'

// Initialize Module
const AuthService = {}

AuthService.login = async (payload) => {
  try {
    const { email, password } = payload
    let user = await UserModel.findOne({ email })
    let match = await compare(password, user?.password)
    if (!user || !match) throw createHttpError(401, 'Authentication Failed!')
    let data = user.getUserInfo()
    return data
  } catch (error) {
    throw createHttpError(401, 'Authentication Failed!')
  }
}

export default AuthService

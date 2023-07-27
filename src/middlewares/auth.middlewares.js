// External Modules:
import createError from 'http-errors'
import UserModel from './../models/People.model.js'
import SessionModel from './../models/Session.model.js'
import AuthUtils from '../utils/auth.utils.js'

const { jwtDecode } = AuthUtils

// Initialize Module
const AuthMiddleware = {}

AuthMiddleware.authenticate = async (req, res, next) => {
  try {
    const accessToken = req.cookies['accessToken']
    const refreshToken = req.cookies['refreshToken']

    if (accessToken) {
      const {
        decoded: { user, session },
      } = jwtDecode(accessToken)
      req.user = user
      req.session = session
      return next()
    }

    if (!accessToken && refreshToken) {
      const {
        decoded: { session },
      } = jwtDecode(refreshToken)

      let query = { _id: session?._id, valid: true }
      let updatedData = { updatedAt: Date.now() }
      let options = { new: true }

      const validSession = await SessionModel.findOneAndUpdate(
        query,
        updatedData,
        options
      )

      if (!validSession) {
        res.cookie('accessToken', '', {
          maxAge: 0,
          httpOnly: true,
        })
        res.cookie('refreshToken', '', {
          maxAge: 0,
          httpOnly: true,
        })
        return next(createError(401, 'Authentication Failed'))
      }

      const user = await UserModel.findById(
        session?.user,
        ' _id name email mobile avatar roles'
      )

      let access = user.generateJwtToken({
        user: user,
        session: validSession,
      })

      let refresh = user.generateJwtToken(
        { session: validSession },
        process.env.REFRESH_TOKEN
      )
      res.cookie('accessToken', access, {
        maxAge: process.env.ACCESS_TOKEN,
        httpOnly: true,
      })
      res.cookie('refreshToken', refresh, {
        maxAge: process.env.REFRESH_TOKEN,
        httpOnly: true,
      })
      req.session = validSession
      req.user = user
      return next()
    }
    if (!accessToken && !refreshToken) {
      return next(createError(401, 'Authentication Failed'))
    }
  } catch (error) {
    return next('Internal Server Error!')
  }
}

/**
 * @desc Authorization Checker Middleware
 * @param {Array<string>} roles
 * @returns next middleware
 */
AuthMiddleware.authorize = (roles) => (req, res, next) => {
  if (roles.some((role) => req?.user?.roles.includes(role))) {
    next()
  } else {
    next(createError(401, `Access Denied! ${roles.join('_')} Only`))
  }
}

/**
 * @desc Single User Authorize Middleware, A single user only can retrive, edit, update his inidividual profile.
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
AuthMiddleware.authorizeSelf = (req, res, next) => {
  if (req?.user?.roles.includes('admin')) return next()

  const accessId = req.params.id
  const userId = req.user._id.toString()

  if (accessId === userId) {
    next()
  } else {
    next(createError(401, `Access Denied!`))
  }
}

export default AuthMiddleware

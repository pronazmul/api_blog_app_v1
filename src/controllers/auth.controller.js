import createError from 'http-errors'
import AuthUtils from './../utils/auth.utils.js'
import config from '../config/index.js'
import GlobalUtils from './../utils/global.utils.js'
import UserService from '../services/user.service.js'
import SessionService from '../services/session.service.js'
import AuthService from '../services/auth.service.js'
import UserConst from '../consts/user.const.js'
import RoleService from '../services/role.service.js'

const { detectDevice } = AuthUtils

// Module Export
const AuthController = {}

AuthController.register = async (req, res, next) => {
  try {
    // Collect Creatable Fields from Requrest Boty
    let body = GlobalUtils.fieldsFromObject(req.body, UserConst.createFields)

    // Add Default Role
    let role = await RoleService.default()
    body.role = role._id

    // Create User
    let user = await AuthService.register(body)

    let session = await SessionService.create({
      user: user?._id,
      userAgent: detectDevice(req.headers['user-agent']),
    })

    let accessToken = AuthUtils.jwtSign({ user: user, session })
    let refreshToken = AuthUtils.jwtSign({ session }, config.refresh_token)

    res.cookie('accessToken', accessToken, {
      maxAge: config.access_token,
      httpOnly: true,
    })
    res.cookie('refreshToken', refreshToken, {
      maxAge: config.refresh_token,
      httpOnly: true,
    })

    let response = GlobalUtils.fromatResponse(
      {
        ...user,
        session: session?._id,
      },
      'User Created & Login Success!'
    )

    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}

AuthController.login = async (req, res, next) => {
  try {
    let { email, password } = req.body
    let user = await AuthService.login({ email, password })

    let session = await SessionService.create({
      user: user?._id,
      userAgent: detectDevice(req.headers['user-agent']),
    })
    let accessToken = AuthUtils.jwtSign({ user: user, session })
    let refreshToken = AuthUtils.jwtSign({ session }, config.refresh_token)
    res.cookie('accessToken', accessToken, {
      maxAge: config.access_token,
      httpOnly: true,
    })
    res.cookie('refreshToken', refreshToken, {
      maxAge: config.refresh_token,
      httpOnly: true,
    })

    let response = GlobalUtils.fromatResponse(
      {
        ...user,
        session: session?._id,
      },
      'User Login Success!'
    )
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

AuthController.loggedInInfo = async (req, res, next) => {
  const { user, session } = req
  let response = GlobalUtils.fromatResponse(
    {
      ...user,
      session: session?._id,
    },
    'Login Info Success!'
  )
  res.status(200).json(response)
}

AuthController.activeSessions = async (req, res, next) => {
  try {
    let reqQuery = { ...req.query, user: req.params.userId, valid: true }
    let result = await SessionService.activeSessions(reqQuery)

    let response = GlobalUtils.fromatResponse(
      result?.data,
      'Active Sessions Success!',
      result?.meta
    )

    res.status(200).json(response)
  } catch (error) {
    console.log({ error })
    next(createError(800, error))
  }
}

AuthController.deactiveSession = async (req, res, next) => {
  try {
    let session = await SessionService.deactivateSession(req.params.sessionId)
    let response = GlobalUtils.fromatResponse(session, 'Session End Success!')
    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}

AuthController.logout = async (req, res, next) => {
  try {
    console.log({ user: req.user, session: req.session })

    await SessionService.deactivateSession(req.session._id)
    res.cookie('accessToken', '', {
      maxAge: 0,
      httpOnly: true,
    })
    res.cookie('refreshToken', '', {
      maxAge: 0,
      httpOnly: true,
    })

    let response = GlobalUtils.fromatResponse(null, 'Logout Success!')

    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}

export default AuthController

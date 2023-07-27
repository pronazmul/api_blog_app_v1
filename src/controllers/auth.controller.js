import createError from 'http-errors'
import AuthUtils from './../utils/auth.utils.js'
import config from '../config/index.js'
import GlobalUtils from './../utils/global.utils.js'
import UserService from '../services/user.service.js'
import SessionService from '../services/session.service.js'
import AuthService from '../services/auth.service.js'

const { detectDevice } = AuthUtils

// Module Export
const AuthController = {}

AuthController.register = async (req, res, next) => {
  try {
    let body = GlobalUtils.fieldsFromObject(req.body, [
      'name',
      'email',
      'password',
      'mobile',
      'dob',
    ])
    let user = await UserService.create(body)
    let session = SessionService.create({
      user: user?._id,
      userAgent: detectDevice(req.headers['user-agent']),
    })
    let accessToken = AuthUtils.jwtSign({ user: user, session })
    let refreshToken = AuthUtils.jwtSign({ session }, config.refresh_token)
    res.cookie('accessToken', accessToken, {
      maxAge: process.env.ACCESS_TOKEN,
      httpOnly: true,
    })
    res.cookie('refreshToken', refreshToken, {
      maxAge: process.env.REFRESH_TOKEN,
      httpOnly: true,
    })

    let response = GlobalUtils.fromatResponse(
      {
        ...user,
        session: session?._id,
      },
      'User Created Success!'
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
    let session = SessionService.create({
      user: user?._id,
      userAgent: detectDevice(req.headers['user-agent']),
    })
    let accessToken = AuthUtils.jwtSign({ user: user, session })
    let refreshToken = AuthUtils.jwtSign({ session }, config.refresh_token)
    res.cookie('accessToken', accessToken, {
      maxAge: process.env.ACCESS_TOKEN,
      httpOnly: true,
    })
    res.cookie('refreshToken', refreshToken, {
      maxAge: process.env.REFRESH_TOKEN,
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
    let sessions = await SessionService.activeSessions(req.params.userId)
    let response = GlobalUtils.fromatResponse(
      sessions,
      'Active Sessions Success!'
    )

    console.log(sessions)
    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
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
    let session = await SessionService.deactivateSession(req.session._id)
    res.cookie('accessToken', '', {
      maxAge: 0,
      httpOnly: true,
    })
    res.cookie('refreshToken', '', {
      maxAge: 0,
      httpOnly: true,
    })

    let response = GlobalUtils.fromatResponse(session, 'Logout Success!')
    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}

export default AuthController

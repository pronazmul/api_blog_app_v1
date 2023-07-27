import DeviceDetector from 'node-device-detector'
import jwt from 'jsonwebtoken'
import config from '../config/index.js'

// Initialize Module
const AuthUtils = {}

AuthUtils.detectDevice = (agent) => {
  // Initiazlise Detector
  const detector = new DeviceDetector({
    clientIndexes: true,
    deviceIndexes: true,
    deviceAliasCode: false,
  })

  const { os = {}, client = {}, device = {} } = detector.detect(agent)

  const operatingSystem = os?.name || ''
  const browser = client?.name || ''
  const deviceType = device?.type || ''
  const deviceBrand = device?.brand || ''
  const deviceInfo = `${operatingSystem} ${browser} ${deviceType} ${deviceBrand}`
  return deviceInfo
}

AuthUtils.jwtSign = (userObject, expires = config.jwt_expire_time) => {
  return jwt.sign(userObject, config.jwt_secret, {
    expiresIn: expires,
  })
}

AuthUtils.jwtDecode = (token) => {
  try {
    const decoded = jwt.verify(token, config.jwt_secret)
    return { valid: true, expired: false, decoded }
  } catch (error) {
    return {
      valid: false,
      expired: error.message === 'jwt expired',
      decoded: null,
    }
  }
}

export default AuthUtils

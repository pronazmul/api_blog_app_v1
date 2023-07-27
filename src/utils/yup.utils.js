// Initialize Module
const YupUtils = {}

YupUtils.ValidationError = (error) => {
  return error.map((e) => ({ message: e?.message, path: e?.path }))
}

export default YupUtils

import { object, string } from 'yup'
import GlobalConst from '../consts/global.const.js'
import LikeConst from '../consts/like.const.js'

const { numberExp } = GlobalConst.regexp

// Initialize Module
const AnalyticsSchema = {}

AnalyticsSchema.followers = object()
  .shape({
    day: string().optional().matches(numberExp, 'Invaid Day Value'),
  })
  .strict()
  .noUnknown()

export default AnalyticsSchema

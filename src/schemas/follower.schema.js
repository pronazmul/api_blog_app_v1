import { object, string } from 'yup'
import GlobalConst from '../consts/global.const.js'
import FollowerConst from '../consts/follower.const.js'

const { numberExp } = GlobalConst.regexp

// Initialize Module
const FollowerSchema = {}

FollowerSchema.fetchAll = object()
  .shape({
    page: string().optional().matches(numberExp, 'Page Should Be Number'),
    limit: string().optional().matches(numberExp, 'Limit Should Be Number'),
    sortBy: string()
      .optional()
      .oneOf(FollowerConst.searchOptions, 'Invalid sortBy value'),
    sortOrder: string()
      .optional()
      .oneOf(['asc', 'desc'], 'Invalid sortOrder value'),
  })
  .strict()
  .noUnknown()

export default FollowerSchema

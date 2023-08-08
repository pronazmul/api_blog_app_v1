import { object, string } from 'yup'
import GlobalConst from '../consts/global.const.js'
import LikeConst from '../consts/like.const.js'

const { numberExp } = GlobalConst.regexp

// Initialize Module
const LikeSchema = {}

LikeSchema.fetchAll = object()
  .shape({
    search: string().typeError('Search Value Should Be String'),
    page: string().optional().matches(numberExp, 'Invalid Page'),
    limit: string().optional().matches(numberExp, 'Invalid limit'),
    sortBy: string()
      .optional()
      .oneOf(LikeConst.sortOptions, 'Invalid sortBy value'),
    sortOrder: string()
      .optional()
      .oneOf(['asc', 'desc'], 'Invalid sortOrder value'),
  })
  .strict()
  .noUnknown()

export default LikeSchema

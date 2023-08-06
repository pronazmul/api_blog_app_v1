import { object, string } from 'yup'
import GlobalConst from '../consts/global.const.js'
import SessionConst from '../consts/session.const.js'

const { numberExp } = GlobalConst.regexp

// Initialize Module
const RoleSchema = {}

RoleSchema.fetchAll = object()
  .shape({
    search: string().typeError('Search Value Should Be String'),
    page: string().optional().matches(numberExp, 'Invalid Page'),
    limit: string().optional().matches(numberExp, 'Invalid limit'),
    sortBy: string()
      .optional()
      .oneOf(SessionConst.sortOptions, 'Invalid sortBy value'),
    sortOrder: string()
      .optional()
      .oneOf(['asc', 'desc'], 'Invalid sortOrder value'),
  })
  .strict()
  .noUnknown()

export default RoleSchema

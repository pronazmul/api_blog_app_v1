import { object, string } from 'yup'
import GlobalConst from '../consts/global.const.js'
import NotificationConst from './../consts/notification.const.js'

const { numberExp } = GlobalConst.regexp

// Initialize Module
const NotificationSchema = {}

NotificationSchema.fetchAll = object()
  .shape({
    search: string().typeError('Search Value Should Be String'),
    page: string().optional().matches(numberExp, 'Invalid Page'),
    limit: string().optional().matches(numberExp, 'Invalid limit'),
    sortBy: string()
      .optional()
      .oneOf(NotificationConst.sortOptions, 'Invalid sortBy value'),
    sortOrder: string()
      .optional()
      .oneOf(['asc', 'desc'], 'Invalid sortOrder value'),
  })
  .strict()
  .noUnknown()

export default NotificationSchema

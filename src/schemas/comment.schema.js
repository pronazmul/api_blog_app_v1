import { object, string } from 'yup'
import GlobalConst from '../consts/global.const.js'
import CommentConst from '../consts/comment.const.js'

const { numberExp, objectIdExp } = GlobalConst.regexp

// Initialize Module
const CommentSchema = {}

CommentSchema.create = object()
  .shape({
    content: string()
      .typeError('Comment Should Be String!')
      .required('Comment Content is Required!'),
    user: string()
      .matches(objectIdExp, 'Invalid User ID!')
      .required('UserID is Required!'),
  })
  .strict()
  .noUnknown()

CommentSchema.fetchAll = object()
  .shape({
    search: string().typeError('Search Value Should Be String'),
    page: string().optional().matches(numberExp, 'Invalid Page'),
    limit: string().optional().matches(numberExp, 'Invalid limit'),
    sortBy: string()
      .optional()
      .oneOf(CommentConst.sortOptions, 'Invalid sortBy value'),
    sortOrder: string()
      .optional()
      .oneOf(['asc', 'desc'], 'Invalid sortOrder value'),
  })
  .strict()
  .noUnknown()

export default CommentSchema

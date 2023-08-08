import { object, string } from 'yup'
import GlobalConst from '../consts/global.const.js'
import TagConst from './../consts/tag.const.js'

const { numberExp, alphabetExp } = GlobalConst.regexp

// Initialize Module
const TagSchema = {}

TagSchema.create = object()
  .shape({
    name: string()
      .matches(alphabetExp, 'Tag should be alplabet only!')
      .required('Name is Required!'),
  })
  .strict()
  .noUnknown()

TagSchema.update = object()
  .shape({
    name: string()
      .optional()
      .matches(alphabetExp, 'Tag should be alplabet only!'),
  })
  .strict()
  .noUnknown()

TagSchema.fetchAll = object()
  .shape({
    search: string().typeError('Search Value Should Be String'),
    page: string().optional().matches(numberExp, 'Invalid Page'),
    limit: string().optional().matches(numberExp, 'Invalid limit'),
    sortBy: string()
      .optional()
      .oneOf(TagConst.sortOptions, 'Invalid sortBy value'),
    sortOrder: string()
      .optional()
      .oneOf(['asc', 'desc'], 'Invalid sortOrder value'),
  })
  .strict()
  .noUnknown()

export default TagSchema

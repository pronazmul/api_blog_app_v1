import { object, string } from 'yup'
import GlobalConst from '../consts/global.const.js'
import CategoryConst from '../consts/category.const.js'

const { numberExp, alphabetExp } = GlobalConst.regexp

// Initialize Module
const CategorySchema = {}

CategorySchema.create = object()
  .shape({
    name: string()
      .matches(alphabetExp, 'Name should be alplabet only!')
      .required('Name is Required!'),
    description: string().optional().typeError('Description Should Be String!'),
  })
  .strict()
  .noUnknown()

CategorySchema.update = object()
  .shape({
    name: string()
      .optional()
      .matches(alphabetExp, 'Name should be alplabet only!'),
    description: string().optional().typeError('Description Should Be String!'),
  })
  .strict()
  .noUnknown()

CategorySchema.fetchAll = object()
  .shape({
    search: string().typeError('Search Value Should Be String'),
    page: string().optional().matches(numberExp, 'Invalid Page'),
    limit: string().optional().matches(numberExp, 'Invalid limit'),
    sortBy: string()
      .optional()
      .oneOf(CategoryConst.sortOptions, 'Invalid sortBy value'),
    sortOrder: string()
      .optional()
      .oneOf(['asc', 'desc'], 'Invalid sortOrder value'),
  })
  .strict()
  .noUnknown()

export default CategorySchema

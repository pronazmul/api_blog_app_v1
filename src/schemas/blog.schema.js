import { object, string, array } from 'yup'
import GlobalConst from '../consts/global.const.js'
import BlogConst from '../consts/blog.const.js'

const { numberExp, objectIdExp } = GlobalConst.regexp

// Initialize Module
const BlogSchema = {}

BlogSchema.create = object()
  .shape({
    title: string()
      .typeError('Title Should Be String!')
      .required('Blog Title is Required!'),
    content: string()
      .typeError('Description Should Be String!')
      .required('Blog Description is Required!'),
    category: string()
      .matches(objectIdExp, 'Invalid Category ID!')
      .required('CategoryID is Required!'),
    subcategory: string()
      .matches(objectIdExp, 'Invalid SubCategory ID!')
      .required('SubCategoryID is Required!'),
    tags: string()
      .test('is-valid-array', 'Invalid Tags ID!', (value) => {
        try {
          const parsedArray = JSON.parse(value)
          let checkObjectID = parsedArray.every((tag) => objectIdExp.test(tag))
          return checkObjectID
        } catch (error) {
          return false
        }
      })
      .required('Tags Are Required!'),
  })
  .strict()
  .noUnknown()

BlogSchema.update = object()
  .shape({
    title: string().optional().typeError('Title Should Be String!'),
    content: string().optional().typeError('Description Should Be String!'),
  })
  .strict()
  .noUnknown()

BlogSchema.fetchAll = object()
  .shape({
    search: string().typeError('Search Value Should Be String'),
    page: string().optional().matches(numberExp, 'Invalid Page'),
    limit: string().optional().matches(numberExp, 'Invalid limit'),
    sortBy: string()
      .optional()
      .oneOf(BlogConst.sortOptions, 'Invalid sortBy value'),
    sortOrder: string()
      .optional()
      .oneOf(['asc', 'desc'], 'Invalid sortOrder value'),
  })
  .strict()
  .noUnknown()

export default BlogSchema

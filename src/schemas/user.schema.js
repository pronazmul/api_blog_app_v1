import { object, string, ref, array, number } from 'yup'
import GlobalConst from '../consts/global.const.js'
import UserConst from '../consts/user.const.js'

const { email, mobile, password } = GlobalConst.regexp

// Initialize Module
const UserSchema = {}

UserSchema.create = object().shape({
  name: string().required('Name is Required!'),
  email: string()
    .matches(email, 'Invalid Email Address!')
    .required('Email is Required!'),
  phone: string().optional().matches(mobile, 'Invalid phone Number!'),
  password: string()
    .matches(password, 'Invalid Password!')
    .required('Password Is Required!'),
})

UserSchema.login = object().shape({
  email: string()
    .matches(email, 'Authentication Failed')
    .required('Email is Required!'),
  password: string()
    .matches(password, 'Authentication Failed')
    .required('Password Is Required!'),
})

UserSchema.update = object().shape({
  name: string().optional(),
  email: string().optional().matches(email, 'Invalid Email Address!'),
  mobile: string().optional().matches(mobile, 'Invalid Mobile Number!'),
})

UserSchema.updatePassword = object().shape({
  currentPassword: string()
    .required('Old Password is Required!')
    .matches(password, 'Invalid Password!')
    .min(8, 'Invalid Password!')
    .max(50, 'Invalid Password!'),
  newPassword: string()
    .required('New Password is Required!')
    .notOneOf([ref('currentPassword')], 'Nothing to change!')
    .matches(password, 'Uppercase Lowercase Special char Required')
    .min(8, 'Password Should be minimum 8 character')
    .max(50, 'Too long'),
  confirmPassword: string()
    .required('Confirm Password is Required!')
    .when('newPassword', (password, field) =>
      password ? field.required() : field
    )
    .oneOf([ref('newPassword')], 'Password does not matched'),
})

UserSchema.updateRole = object().shape({
  roles: array().typeError('Roles must be array'),
})

UserSchema.fetchAllUser = object()
  .shape({
    search: string().typeError('Search Value Should Be String!'),
    page: number().typeError('Page Must be Number!').optional(),
    limit: number()
      .typeError('Limit must be a number')
      .optional()
      .max(500, 'Limit cannot exceed 500'),
    sortBy: string()
      .optional()
      .oneOf(UserConst.sortOptions, 'Invalid sortBy value'),
    sortOrder: string()
      .optional()
      .oneOf(['asc', 'desc'], 'Invalid sortOrder value'),
    // Filter Options
    username: string().typeError('Username Should Be String!').optional(),
    'address.city': string().typeError('Username Should Be String!').optional(),
    active: string()
      .optional()
      .oneOf(['true', 'false'], 'Invalid Active Value!'),
  })
  .strict()
  .noUnknown()

export default UserSchema

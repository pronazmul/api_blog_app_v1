import { object, string, date, ref, array, number } from 'yup'
import GlobalConst from '../consts/global.const.js'
import UserConst from '../consts/user.const.js'

const {
  emailExp,
  mobileExp,
  passwordExp,
  alphabetExp,
  numberExp,
  usernameExp,
  postCodeExp,
  objectIdExp,
} = GlobalConst.regexp

// Initialize Module
const UserSchema = {}
UserSchema.login = object()
  .shape({
    email: string()
      .matches(emailExp, 'Invalid Email')
      .required('Email is Required!'),
    password: string()
      .matches(passwordExp, 'Invalid Password')
      .required('Password Is Required!'),
  })
  .strict()
  .noUnknown()

UserSchema.create = object()
  .shape({
    name: string()
      .matches(alphabetExp, 'Name should be alplabet only!')
      .required('Name is Required!'),
    email: string()
      .matches(emailExp, 'Invalid Email Address!')
      .required('Email is Required!'),
    password: string()
      .matches(
        passwordExp,
        'Password must be at least 8 characters long and contain letters, numbers, and special characters!'
      )
      .required('Password Is Required!'),
    username: string()
      .matches(
        usernameExp,
        'Username must be at least 6 char long and contain letters or numbers only!'
      )
      .required('Username is Required!'),
    phone: string().optional().matches(mobileExp, 'Invalid phone Number!'),
    dob: string()
      .nullable()
      .test('is-valid-date', 'Invalid Date of Birth!', (value) => {
        if (!value) return true // Return true if the date is null or not provided
        return !isNaN(Date.parse(value)) // Return true if the date string is a valid ISO 8601 date
      })
      .transform((value, originalValue) =>
        originalValue ? new Date(originalValue) : null
      ),
    bio: string().optional().typeError('Bio should Be String!'),
    address: object().shape({
      postCode: string()
        .optional()
        .matches(postCodeExp, 'Must be number and 4 digit only!'),
      city: string().optional().matches(alphabetExp, 'Must be Alphabet Only!'),
      country: string()
        .optional()
        .matches(alphabetExp, 'Must be Alphabet Only!'),
    }),
  })
  .strict()
  .noUnknown()

UserSchema.update = object()
  .shape({
    name: string()
      .optional()
      .matches(alphabetExp, 'Name should be alplabet only!'),
    username: string()
      .optional()
      .matches(
        usernameExp,
        'Username must be at least 6 char long and contain letters or numbers only!'
      ),
    phone: string().optional().matches(mobileExp, 'Invalid phone Number!'),
    dob: string()
      .nullable()
      .test('is-valid-date', 'Invalid Date of Birth!', (value) => {
        if (!value) return true // Return true if the date is null or not provided
        return !isNaN(Date.parse(value)) // Return true if the date string is a valid ISO 8601 date
      })
      .transform((value, originalValue) =>
        originalValue ? new Date(originalValue) : null
      ),
    bio: string().optional().typeError('Bio should Be String!'),
    address: object().shape({
      street: string().optional(),
      postCode: string()
        .optional()
        .matches(postCodeExp, 'Must be number and 4 digit only!'),
      city: string().optional().matches(alphabetExp, 'Must be Alphabet Only!'),
      country: string()
        .optional()
        .matches(alphabetExp, 'Must be Alphabet Only!'),
    }),
  })
  .strict()
  .noUnknown()

UserSchema.updatePassword = object()
  .shape({
    currentPassword: string()
      .required('Old Password is Required!')
      .matches(passwordExp, 'Invalid Password!')
      .min(8, 'Invalid Password!')
      .max(50, 'Invalid Password!'),
    newPassword: string()
      .required('New Password is Required!')
      .notOneOf([ref('currentPassword')], 'Nothing to change!')
      .matches(passwordExp, 'Uppercase Lowercase Special char Required')
      .min(8, 'Password Should be minimum 8 character')
      .max(50, 'Too long'),
    confirmPassword: string()
      .required('Confirm Password is Required!')
      .when('newPassword', (password, field) =>
        password ? field.required() : field
      )
      .oneOf([ref('newPassword')], 'Password does not matched'),
  })
  .strict()
  .noUnknown()

UserSchema.updateRoles = object()
  .shape({
    role: string()
      .required('Role is Required!')
      .matches(objectIdExp, 'Invalid Object ID!'),
  })
  .strict()
  .noUnknown()

UserSchema.fetchAllUser = object()
  .shape({
    search: string().typeError('Search Value Should Be String'),
    page: string().optional().matches(numberExp, 'Invalid Page'),
    limit: string().optional().matches(numberExp, 'Invalid limit'),
    sortBy: string()
      .optional()
      .oneOf(UserConst.sortOptions, 'Invalid sortBy value'),
    sortOrder: string()
      .optional()
      .oneOf(['asc', 'desc'], 'Invalid sortOrder value'),
    // Filter Options
    username: string().typeError('Username Should Be String!').optional(),
    'address.city': string().optional().matches(alphabetExp, 'Invalid City!'),
    active: string()
      .optional()
      .oneOf(['true', 'false'], 'Invalid Active Value!'),
  })
  .strict()
  .noUnknown()

export default UserSchema

import GlobalConst from '../consts/global.const.js'
const { email, mobile, password } = GlobalConst.regexp

// Initialize Module

const MongooseUtils = {}

/**
 * @desc Email Phone Validatior Function
 * @param {}
 * @returns {Object}
 */
MongooseUtils.validateEmail = () => {
  return {
    validator: (value) => email.test(value),
    message: 'Invalid Email Address!',
  }
}

/**
 * @desc Mobile Phone Validatior Function
 * @param {}
 * @returns {Object}
 */
MongooseUtils.validatePhone = () => {
  return {
    validator: (value) => mobile.test(value),
    message: 'Invalid Phone Number!',
  }
}

/**
 * @desc Password Validatior Function
 * @param {}
 * @returns {Object}
 */
MongooseUtils.validatePassowrd = () => {
  return {
    validator: (value) => password.test(value),
    message:
      'Password should contain Uppercase, Lowercase and Special Character must be 6 to 15 character long!',
  }
}

/**
 * @desc Enum Matched Function
 * @param {Array} Enum Array
 * @returns {Object}
 */
MongooseUtils.validateEnum = (array = []) => {
  return {
    enum: array,
    message: `{VALUE} is not a valid {PATH}`,
  }
}

/**
 * @desc Min Max Validator Function
 * @param {Number} Minimum Number
 * @param {Number} Maximum Number
 * @returns {Object}
 */
MongooseUtils.validateMinMax = (min = 0, max = 5) => {
  return {
    validator: (value) => Boolean(value >= min && value <= max),
    message: `Minimum ${min} and Maximum ${max} is allowed, But got {VALUE}`,
  }
}

/**
 * @desc Mmongoose Validation Error Formatter Function
 * @param {Object} Error Object
 * @returns {Object} Formatted Object
 */
MongooseUtils.errorFormatter = (error) => {
  return Object.entries(error).reduce(
    (state, [k, { message }]) => ({ ...state, [k]: message }),
    {}
  )
}

/**
 * @desc Mmongoose Validation Error Formatter Function
 * @param {Object} Error Object
 * @returns {Object} Formatted Object
 */
MongooseUtils.duplicateKeyFormatter = (error) => {
  return Object.entries(error).reduce(
    (state, [k, v]) => [...state, { message: `${v} already exists!`, path: k }],
    []
  )
}

/**
 * @desc Mongoose "ValidationError" Handler Function
 * @param {Object} Error Object
 * @returns {Object} Formatted Object
 */
MongooseUtils.ValidationError = (error) => {
  return Object.values(error).map((e) => ({
    message: e?.message,
    path: e?.path,
  }))
}

/**
 * @desc Generates a search condition object based on search and filter options.
 * @param {string} search - The search term or query.
 * @param {string[]} searchOptions - An array of field names to search within.
 * @param {object} filterOptions - An object containing filter options as key-value pairs.
 * @returns {object} - The search condition object to be used in a database query.
 */

MongooseUtils.searchCondition = (
  reqQuery = {},
  searchOptions = [],
  filterOptions = []
) => {
  const query = {}
  const andCondition = []

  if (reqQuery?.search && searchOptions?.length) {
    andCondition.push({
      $or: searchOptions.map((field) => ({
        [field]: {
          $regex: reqQuery.search,
          $options: 'i',
        },
      })),
    })
  }

  filterOptions = filterOptions.filter((value) =>
    reqQuery.hasOwnProperty(value)
  )

  if (filterOptions.length) {
    andCondition.push({
      $and: filterOptions.map((key) => ({
        [key]: reqQuery[key],
      })),
    })
  }

  return andCondition?.length ? { $and: andCondition } : query
}

export default MongooseUtils

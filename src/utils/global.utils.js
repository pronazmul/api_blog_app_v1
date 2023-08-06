// Initiazlize Object
const GlobalUtils = {}

/**
@desc Returns a random element from an array.
@param {Array} array - The array to choose a random element from.
@returns {*} The randomly selected element from the array.
*/
GlobalUtils.randomSingleFromArray = (array) => {
  return array[Math.floor(Math.random() * array.length)]
}

/**
@desc Returns an array of randomly selected elements from the given array.
@param {Array} array - The array to choose elements from.
@param {number} [count] - The number of elements to return. If not specified, a random number of elements will be returned.
@returns {Array} An array containing the randomly selected elements.
*/
GlobalUtils.randomMultipleFromArray = (array, count) => {
  const shuffledList = array.sort(() => Math.random() - 0.5)
  const newArraySize = Math.floor(Math.random() * array.length)
  return shuffledList.slice(0, count ? count : newArraySize)
}

/**
@desc Extracts specific fields from an object and returns a new object with only those fields.
@param {Object} obj - The object from which to extract fields.
@param {Array} fields - An array of field names to be extracted from the object.
@returns {Object} A new object containing only the specified fields and their values.
*/
GlobalUtils.fieldsFromObject = (obj, fields) => {
  let data = {}
  fields.forEach((element) => {
    if (obj.hasOwnProperty(element)) {
      data = { ...data, [element]: obj[element] }
    }
  })
  return data
}

/**
 * Calculates pagination values based on the provided options.
 *
 * @param {object} options - The pagination options.
 * @param {number} [options.page=1] - The current page number (optional).
 * @param {number} [options.limit=1] - The maximum number of items per page (optional).
 * @param {string} [options.sortBy='createdAt'] - The field to sort the results by (optional).
 * @param {string} [options.sortOrder='desc'] - The sort order for the results (optional).
 * @returns {object} - The pagination values including page, limit, skip, sortBy, and sortOrder.
 */
GlobalUtils.calculatePagination = (options = {}) => {
  const page = Number(options?.page || 1)
  const limit = Number(options?.limit || 10)
  const skip = (page - 1) * limit

  const sortBy = options?.sortBy || 'createdAt'
  const sortOrder = options?.sortOrder || 'desc'
  return { page, limit, skip, sortBy, sortOrder: sortOrder === 'asc' ? 1 : -1 }
}

/**
 * Formats the response object with provided data, message, and metadata.
 *
 * @param {*} data - The data to be included in the response.
 * @param {string} [message='Request Success!'] - The message associated with the response (optional).
 * @param {object} [meta={ page: 0, limit: 0, total: 0 }] - The metadata associated with the response (optional).
 * @returns {object} - The formatted response object.
 */
GlobalUtils.fromatResponse = (
  data,
  message = 'Request Success!',
  meta = {}
) => {
  return {
    success: true,
    message,
    meta,
    data: data,
  }
}

export default GlobalUtils

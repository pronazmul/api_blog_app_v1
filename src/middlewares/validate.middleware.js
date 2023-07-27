import createHttpError from 'http-errors'

// Initialize Module
const ValidateMiddleware = {}

ValidateMiddleware.validateRequest = (schema) => async (req, res, next) => {
  try {
    if (Object.entries(req.body).length)
      await schema.validate(req.body, { abortEarly: false })

    if (Object.entries(req.query).length)
      await schema.validate(req.query, { abortEarly: false })

    next()
  } catch (error) {
    next(createHttpError(422, error))
  }
}

export default ValidateMiddleware

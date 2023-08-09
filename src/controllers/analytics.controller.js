// External Modules:
import createError from 'http-errors'

// Internal Modules:
import GlobalUtils from '../utils/global.utils.js'
import AnalyticsService from '../services/analytics.service.js'

// Initialize Module
const AnalyticsController = {}

AnalyticsController.followers = async (req, res, next) => {
  try {
    let payload = { ...req.query, user: req.params.id }

    let result = await AnalyticsService.followers(payload)

    let response = GlobalUtils.fromatResponse(
      result,
      'Followers Analytics Success'
    )
    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}

export default AnalyticsController

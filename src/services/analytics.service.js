import config from '../config/index.js'
import FollowerModel from './../models/Follower.model.js'
// import moment from 'moment/moment.js'
import moment from 'moment'

// Initialize Module
const AnalyticsService = {}

AnalyticsService.followers = async (reqQuery) => {
  try {
    let day = Number(reqQuery?.day) || Number(config.default_analytics_time)
    let date = new Date()
    let startFrom = new Date(date.setDate(date.getDate() - day))

    let analytics = await FollowerModel.aggregate([
      { $match: { createdAt: { $gte: startFrom } } },
      {
        $project: {
          day: {
            $dayOfMonth: '$createdAt',
          },
        },
      },
      {
        $group: {
          _id: '$day',
          count: { $sum: 1 },
        },
      },
    ])

    analytics = analytics
      .map((item) => ({
        date: moment({ day: item._id }).format('YYYY-MM-DD'),
        day: item._id,
        count: item.count,
      }))
      .sort((a, b) => a.day - b.day)

    return analytics
  } catch (error) {
    throw error
  }
}

export default AnalyticsService

/**
 * @desc USER SUPPORTERS ANALYTICS
 * @Route [GET]- /api/v2/analytics/supporters
 * @Access protected - [auth]
 * @returns {OBJECT}-{}
 */
const userSupportersAnalytics = async (req, res, next) => {
  try {
    let id = req.user._id

    //CALCULATE START FROM TIMESTAMP
    let day = Number(req.query.day) || Number(process.env.DEFAULT_ANALYTICS_DAY)
    let date = new Date()
    let startFrom = new Date(date.setDate(date.getDate() - day))

    //VIEWS ANALYSIS
    const analysis = await SupportActivities.aggregate([
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

    let modifiedAnalytics = analysis
      .map((item) => ({
        date: moment({ day: item._id }).format('YYYY-MM-DD'),
        day: item._id,
        count: item.count,
      }))
      .sort((a, b) => a.day - b.day)

    if (analysis?.length) {
      return res
        .status(200)
        .json({ status: 'success', data: modifiedAnalytics })
    } else {
      return next(createError(404, 'No Supporters Analytics Found'))
    }
  } catch (error) {
    next(createError(500, error))
  }
}

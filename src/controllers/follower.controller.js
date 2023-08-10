// External Modules:
import createError from 'http-errors'

// Internal Modules:
import GlobalUtils from '../utils/global.utils.js'
import FollowerService from '../services/follower.service.js'
import NotificationService from '../services/notification.service.js'

// Initialize Module
const FollowerController = {}

FollowerController.follow = async (req, res, next) => {
  let reqQuery = { following: req.user._id, follower: req.params.id }
  try {
    let result = await FollowerService.follow(reqQuery)

    // Trigger Follower Notification
    await NotificationService.makeNotification({
      type: 'follow',
      creator: req.user._id,
      user: req.params.id,
      content: `${req.user.name} followed you!`,
    })

    let response = GlobalUtils.fromatResponse(
      result?.data,
      'Follow Success!',
      result?.meta
    )
    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}

FollowerController.unfollow = async (req, res, next) => {
  let reqQuery = { following: req.user._id, follower: req.params.id }
  try {
    let result = await FollowerService.unfollow(reqQuery)
    let response = GlobalUtils.fromatResponse(
      result?.data,
      'Unfollow Success!',
      result?.meta
    )
    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}

FollowerController.followers = async (req, res, next) => {
  let reqQuery = { ...req.query, follower: req.params.id, active: true }
  try {
    let result = await FollowerService.find(reqQuery)
    let response = GlobalUtils.fromatResponse(
      result?.data,
      'All Followers Fetch Success!',
      result?.meta
    )
    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}

FollowerController.following = async (req, res, next) => {
  let reqQuery = { ...req.query, following: req.params.id, active: true }
  try {
    let result = await FollowerService.find(reqQuery)
    let response = GlobalUtils.fromatResponse(
      result?.data,
      'All Following Fetch Success!',
      result?.meta
    )
    res.status(200).json(response)
  } catch (error) {
    next(createError(500, error))
  }
}

export default FollowerController

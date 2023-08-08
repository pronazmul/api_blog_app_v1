import GlobalUtils from '../utils/global.utils.js'
import MongooseUtils from '../utils/mongoose.utils.js'
import FollowerModel from '../models/Follower.model.js'
import ProjectionConst from '../consts/projection.const.js'
import FollowerConst from './../consts/follower.const.js'
import PeopleModel from '../models/People.model.js'

// Initialize Module
const FollowerService = {}

FollowerService.follow = async (query) => {
  try {
    let existsFollow = await FollowerModel.findOne({ ...query })
    if (existsFollow && existsFollow.active) throw Error('Already Followed')

    if (existsFollow && !existsFollow?.active) {
      await FollowerModel.findOneAndUpdate(query, { active: true })
    } else {
      await FollowerModel.create(query)
    }

    await PeopleModel.incrementFollower(query.follower)
    await PeopleModel.incrementFollowing(query.following)

    return { data: { followed: true } }
  } catch (error) {
    throw error
  }
}

FollowerService.unfollow = async (query) => {
  try {
    let followed = await FollowerModel.findOneAndUpdate(
      {
        ...query,
        active: true,
      },
      { active: false }
    )

    if (!followed) throw Error('Not Followed!')

    await PeopleModel.decrementFollower(query.follower)
    await PeopleModel.decrementFollowing(query.following)

    return { data: { unfollowed: true } }
  } catch (error) {
    throw error
  }
}

FollowerService.find = async (reqQuery) => {
  const { page, limit, skip, sortBy, sortOrder } =
    GlobalUtils.calculatePagination(reqQuery)

  const query = MongooseUtils.searchCondition(
    reqQuery,
    FollowerConst.searchOptions,
    FollowerConst.filterOptions
  )
  const sort = { [sortBy]: sortOrder }
  try {
    const result = await FollowerModel.find(query, ProjectionConst.follower)
      .populate({
        path: 'follower',
        select: ProjectionConst.user_with_follower,
      })
      .populate({
        path: 'following',
        select: ProjectionConst.user_with_follower,
      })
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean()
    const total = await FollowerModel.countDocuments(query)
    return { data: result, meta: { page, limit, total } }
  } catch (error) {
    throw error
  }
}

export default FollowerService

import GlobalUtils from '../utils/global.utils.js'
import MongooseUtils from '../utils/mongoose.utils.js'
import LikeModel from '../models/Like.model.js'
import LikeConst from '../consts/like.const.js'
import ProjectionConst from '../consts/projection.const.js'
import BlogModel from '../models/Blog.model.js'

// Initialize Module
const LikeService = {}

LikeService.find = async (reqQuery) => {
  const { page, limit, skip, sortBy, sortOrder } =
    GlobalUtils.calculatePagination(reqQuery)

  const query = MongooseUtils.searchCondition(
    reqQuery,
    LikeConst.searchOptions,
    LikeConst.filterOptions
  )
  const sort = { [sortBy]: sortOrder }
  const projection = ProjectionConst.like
  try {
    const result = await LikeModel.find(query, projection)
      .populate({ path: 'user', select: ProjectionConst.like_user })
      .sort(sort)
      .skip(skip)
      .limit(limit)
    const total = await LikeModel.countDocuments(query)
    return { data: result, meta: { page, limit, total } }
  } catch (error) {
    throw error
  }
}

LikeService.like = async (query) => {
  try {
    let existsLike = await LikeModel.findOne({ ...query })
    if (existsLike && existsLike.active) throw Error('Already Liked!')

    if (existsLike && !existsLike?.active) {
      await LikeModel.findOneAndUpdate(query, { active: true })
    } else {
      await LikeModel.create(query)
    }
    await BlogModel.incrementLikes(query?.blog)
    return { liked: true }
  } catch (error) {
    throw error
  }
}

LikeService.unlike = async (query) => {
  try {
    let followed = await LikeModel.findOneAndUpdate(
      {
        ...query,
        active: true,
      },
      { active: false }
    )

    if (!followed) throw Error('Not Liked!')
    await BlogModel.decrementLikes(query?.blog)
    return { unliked: true }
  } catch (error) {
    throw error
  }
}

export default LikeService

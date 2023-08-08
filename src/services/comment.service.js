import GlobalUtils from '../utils/global.utils.js'
import MongooseUtils from '../utils/mongoose.utils.js'
import CommentModel from '../models/Comment.model.js'
import CommentConst from '../consts/comment.const.js'
import ProjectionConst from './../consts/projection.const.js'

// Initialize Module
const CommentService = {}

CommentService.create = async (payload) => {
  try {
    let newData = new CommentModel(payload)
    await newData.save()

    let result = await CommentModel.findById(
      { _id: newData._id },
      ProjectionConst.comment
    ).populate({
      path: 'user',
      select: ProjectionConst.comment_user,
    })

    return result
  } catch (error) {
    throw error
  }
}

CommentService.find = async (reqQuery) => {
  const { page, limit, skip, sortBy, sortOrder } =
    GlobalUtils.calculatePagination(reqQuery)

  const query = MongooseUtils.searchCondition(
    reqQuery,
    CommentConst.searchOptions,
    CommentConst.filterOptions
  )
  const sort = { [sortBy]: sortOrder }
  const projection = ProjectionConst.comment
  try {
    const result = await CommentModel.find(query, projection)
      .populate({ path: 'user', select: ProjectionConst.comment_user })
      .sort(sort)
      .skip(skip)
      .limit(limit)
    const total = await CommentModel.countDocuments(query)
    return { data: result, meta: { page, limit, total } }
  } catch (error) {
    throw error
  }
}

export default CommentService

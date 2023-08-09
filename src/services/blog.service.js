import GlobalUtils from '../utils/global.utils.js'
import MongooseUtils from '../utils/mongoose.utils.js'
import BlogModel from '../models/Blog.model.js'
import ProjectionConst from '../consts/projection.const.js'
import BlogConst from '../consts/blog.const.js'

// Initialize Module
const BlogService = {}

BlogService.create = async (payload) => {
  try {
    // Create Blog
    let newData = new BlogModel(payload)
    await newData.save()

    // Fetch Single Blog and response
    let result = await BlogModel.findById(
      { _id: newData._id },
      ProjectionConst.blog
    )
      .populate({ path: 'user', select: ProjectionConst.blog_user })
      .populate({ path: 'category', select: ProjectionConst.blog_category })
      .populate({
        path: 'subcategory',
        select: ProjectionConst.blog_subCategory,
      })
      .populate({ path: 'tags', select: ProjectionConst.blog_tags })
    return result
  } catch (error) {
    throw error
  }
}

BlogService.findOneById = async (id) => {
  try {
    let query = { _id: id }
    let projection = ProjectionConst.blog
    let result = await BlogModel.findById(query, projection)
      .populate({ path: 'user', select: ProjectionConst.blog_user })
      .populate({ path: 'category', select: ProjectionConst.blog_category })
      .populate({
        path: 'subcategory',
        select: ProjectionConst.blog_subCategory,
      })
      .populate({ path: 'tags', select: ProjectionConst.blog_tags })

    return result
  } catch (error) {
    throw error
  }
}

BlogService.find = async (reqQuery) => {
  const { page, limit, skip, sortBy, sortOrder } =
    GlobalUtils.calculatePagination(reqQuery)

  const query = MongooseUtils.searchCondition(
    reqQuery,
    BlogConst.searchOptions,
    BlogConst.filterOptions
  )
  const sort = { [sortBy]: sortOrder }
  const projection = ProjectionConst.blog

  try {
    const result = await BlogModel.find(query, projection)
      .populate({ path: 'user', select: ProjectionConst.blog_user })
      .populate({ path: 'category', select: ProjectionConst.blog_category })
      .populate({
        path: 'subcategory',
        select: ProjectionConst.blog_subCategory,
      })
      .populate({ path: 'tags', select: ProjectionConst.blog_tags })
      .sort(sort)
      .skip(skip)
      .limit(limit)

    const total = await BlogModel.countDocuments(query)
    return { data: result, meta: { page, limit, total } }
  } catch (error) {
    console.log({ error })
    throw error
  }
}

BlogService.updateOneById = async (id, payload) => {
  try {
    let query = { _id: id }
    let options = { new: true, select: ProjectionConst.blog }
    const result = await BlogModel.findOneAndUpdate(query, payload, options)
      .populate({ path: 'user', select: ProjectionConst.blog_user })
      .populate({ path: 'category', select: ProjectionConst.blog_category })
      .populate({
        path: 'subcategory',
        select: ProjectionConst.blog_subCategory,
      })
      .populate({ path: 'tags', select: ProjectionConst.blog_tags })
    return result
  } catch (error) {
    throw error
  }
}

BlogService.deleteOneById = async (id) => {
  try {
    let query = { _id: id }
    let result = await BlogModel.findOneAndDelete(query)
    return result
  } catch (error) {
    throw error
  }
}

export default BlogService

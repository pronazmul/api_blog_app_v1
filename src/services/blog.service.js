import { Types } from 'mongoose'
import UserConst from '../consts/user.const.js'
import GlobalUtils from '../utils/global.utils.js'
import MongooseUtils from '../utils/mongoose.utils.js'
import BlogModel from '../models/Blog.model.js'

// Initialize Module
const BlogService = {}

BlogService.create = async (payload) => {
  try {
    let newData = new BlogModel(payload)
    let result = await newData.save()
    return result
  } catch (error) {
    throw error
  }
}

BlogService.findOneById = async (id) => {
  try {
    let query = { _id: id }
    let projection = { password: 0, createdAt: 0, updatedAt: 0 }
    let result = await BlogModel.findById(query, projection)
      .populate('user')
      .populate('tags')

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
    UserConst.searchOptions,
    UserConst.filterOptions
  )
  const sort = { [sortBy]: sortOrder }
  const projection = { password: 0 }

  // Pipeline
  let pipeline = [
    { $match: query },
    {
      $lookup: {
        from: 'peoples',
        localField: 'user',
        foreignField: '_id',
        as: 'user',
      },
    },
    { $unwind: '$user' },
    {
      $lookup: {
        from: 'tags',
        localField: 'tags',
        foreignField: '_id',
        as: 'tags',
      },
    },
    {
      $lookup: {
        from: 'categories',
        let: { categoryId: '$category' }, // Define a variable to hold the 'category' field value
        pipeline: [
          {
            $unwind: '$subCategories', // Unwind the 'subCategories' array
          },
          {
            $match: {
              $expr: { $eq: ['$$categoryId', '$subCategories._id'] }, // Match the specific subcategory _id
            },
          },
        ],
        as: 'category',
      },
    },
    {
      $unwind: '$category',
    },
    {
      $unwind: '$category.subCategories',
    },
    {
      match: {
        'category.subCategories._id': Types.ObjectId(query.category),
      },
    },
    {
      $sort: sort,
    },
    {
      $skip: skip,
    },
    { $limit: limit },
  ]

  try {
    const result = await BlogModel.aggregate(pipeline)

    // const result = await BlogModel.find(query, projection)
    //   .populate('user')
    //   .populate('tags')
    //   .populate('category')
    //   .sort(sort)
    //   .skip(skip)
    //   .limit(limit)

    const total = await BlogModel.countDocuments(query)
    return { data: result, meta: { page, limit, total } }
  } catch (error) {
    throw error
  }
}

BlogService.updateOneById = async (id, payload) => {
  try {
    let query = { _id: id }
    let options = { new: true, select: 'name email mobile avatar roles' }
    const result = await BlogModel.findOneAndUpdate(query, payload, options)
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

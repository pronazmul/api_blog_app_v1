import GlobalUtils from '../utils/global.utils.js'
import MongooseUtils from '../utils/mongoose.utils.js'
import SubCategoryModel from '../models/Subcategory.model.js'
import CategoryModel from '../models/Category.model.js'
import ProjectionConst from '../consts/projection.const.js'
import CategoryConst from '../consts/category.const.js'

// Initialize Module
const CategoryService = {}

//-----------------CAtegories ----------------------

CategoryService.create = async (payload) => {
  try {
    let newData = new CategoryModel(payload)
    let result = await newData.save()
    return result
  } catch (error) {
    throw error
  }
}

CategoryService.findOneById = async (id) => {
  try {
    const query = { _id: id }
    const projection = ProjectionConst.category
    const result = await CategoryModel.findById(query, projection).lean()

    // Fatch Subcategories
    let subCategories = await SubCategoryModel.find(
      { category: id },
      ProjectionConst.subCateogry
    ).lean()

    return { ...result, subCategories }
  } catch (error) {
    throw error
  }
}

CategoryService.find = async (reqQuery) => {
  const { page, limit, skip, sortBy, sortOrder } =
    GlobalUtils.calculatePagination(reqQuery)

  const query = MongooseUtils.searchCondition(
    reqQuery,
    CategoryConst.searchOptions,
    CategoryConst.filterOptions
  )
  const sort = { [sortBy]: sortOrder }
  const projection = ProjectionConst.category
  try {
    const total = await CategoryModel.countDocuments(query)
    const result = await CategoryModel.find(query, projection)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean()

    // Fetch SubCategries
    let data = []
    for (const cat of result) {
      cat.subCategories = await SubCategoryModel.find(
        {
          category: cat._id,
        },
        ProjectionConst.subCateogry
      ).lean()

      data.push(cat)
    }

    return { data, meta: { page, limit, total } }
  } catch (error) {
    throw error
  }
}

CategoryService.updateOneById = async (id, payload) => {
  try {
    let query = { _id: id }
    let options = { new: true, select: ProjectionConst.category }
    const result = await CategoryModel.findOneAndUpdate(query, payload, options)
    return result
  } catch (error) {
    throw error
  }
}

//-----------------Sub CAtegories ----------------------

CategoryService.findAllSubCat = async (reqQuery) => {
  const { page, limit, skip, sortBy, sortOrder } =
    GlobalUtils.calculatePagination(reqQuery)

  const query = MongooseUtils.searchCondition(
    reqQuery,
    CategoryConst.searchOptions,
    CategoryConst.filterOptions
  )
  const sort = { [sortBy]: sortOrder }
  const projection = ProjectionConst.subCateogry
  try {
    const total = await SubCategoryModel.countDocuments(query)
    const result = await SubCategoryModel.find(query, projection)
      .populate({ path: 'category', select: ProjectionConst.category })
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean()

    return { data: result, meta: { page, limit, total } }
  } catch (error) {
    throw error
  }
}

CategoryService.findSubCatById = async (id) => {
  try {
    const query = { _id: id }
    const projection = ProjectionConst.subCateogry
    const result = await SubCategoryModel.findById(query, projection)
      .populate({ path: 'category', select: ProjectionConst.category })
      .lean()

    return { ...result }
  } catch (error) {
    throw error
  }
}
CategoryService.updateSubCatById = async (id, payload) => {
  try {
    let query = { _id: id }
    let options = { new: true, select: ProjectionConst.subCateogry }
    const result = await SubCategoryModel.findOneAndUpdate(
      query,
      payload,
      options
    )
    if (result) return result
    throw new Error('Subcategory Update Failed!')
  } catch (error) {
    throw error
  }
}
CategoryService.createSubCat = async (payload) => {
  try {
    // Check Category First
    let checkCategory = await CategoryModel.findById({
      _id: payload?.category,
    })
    if (!checkCategory) throw new Error('Category Not Exists!')

    // Insert SubCategory
    let newData = new SubCategoryModel(payload)
    let result = await newData.save()
    return result
  } catch (error) {
    throw error
  }
}

export default CategoryService

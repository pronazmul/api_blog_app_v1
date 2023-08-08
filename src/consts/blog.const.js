// Initialize Module
const BlogConst = {}

BlogConst.createFields = ['title', 'content', 'category', 'subcategory', 'tags']
BlogConst.updateFields = ['title', 'content']
BlogConst.searchOptions = [
  'title',
  'content',
  'category.name',
  'subcategory.name',
  'tags.name',
]
BlogConst.sortOptions = ['likesCount', 'commentsCount', 'createdAt']
BlogConst.filterOptions = []

export default BlogConst

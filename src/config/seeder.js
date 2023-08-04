import DbConnection from './db.js'
import GlobalUtils from './../utils/global.utils.js'

// Configuration
DbConnection.connectMongo()

//Models
import SessionModel from '../models/Session.model.js'
import UserModel from '../models/People.model.js'
import BlogModel from '../models/Blog.model.js'
import CategoryModel from '../models/Category.model.js'
import SubCategoryModel from '../models/Subcategory.model.js'
import CommentModel from '../models/Comment.model.js'
import FollowerModel from '../models/Follower.model.js'
import LikeModel from '../models/Like.model.js'
import TagModel from '../models/Tag.model.js'
import NotificationModel from '../models/Notification.model.js'
import RoleModel from '../models/Role.model.js'

// Demo Data
import DummyData from './data.js'

const importData = async () => {
  try {
    //Destroy All
    await UserModel.deleteMany()
    await SessionModel.deleteMany()
    await CategoryModel.deleteMany()
    await SubCategoryModel.deleteMany()
    await TagModel.deleteMany()
    await BlogModel.deleteMany()
    await CommentModel.deleteMany()
    await FollowerModel.deleteMany()
    await LikeModel.deleteMany()
    await NotificationModel.deleteMany()
    await RoleModel.deleteMany()

    //Write Roles Data
    let roles = []
    DummyData.roles.forEach((r) => roles.push(new RoleModel(r)))

    // Write Users
    let users = []
    DummyData.users.forEach((u) =>
      users.push(
        new UserModel({
          ...u,
          role: GlobalUtils.randomSingleFromArray(roles.map((r) => r._id)),
        })
      )
    )

    // Wirte Categories
    let categories = []
    DummyData.categories.forEach((c) => {
      categories.push(
        new CategoryModel({
          name: c.name,
          description: c.description,
          image: c.image,
        })
      )
    })

    // Write SubCategories
    let subCategories = []
    categories.forEach((cat) => {
      let subs = DummyData.categories.filter((c) => c.name === cat.name)[0]
      subCategories.push(
        new SubCategoryModel({
          category: cat._id,
          name: subs.description,
          description: subs.description,
          image: subs.image,
        })
      )
    })

    // Write Tags
    let tags = []
    DummyData.tags.forEach((t) => tags.push(new TagModel({ name: t.name })))

    // Write Blogs && Update used Tags Count
    let blogs = []
    DummyData.blogs.forEach((b) => {
      let selectedCate = GlobalUtils.randomSingleFromArray(subCategories)
      let selectedTags = GlobalUtils.randomMultipleFromArray(
        tags.map((t) => t._id),
        3
      )

      let blog = new BlogModel({
        ...b,
        user: GlobalUtils.randomSingleFromArray(users)._id,
        category: selectedCate.category,
        subcategory: selectedCate._id,
        tags: selectedTags,
      })

      // Update Tags Count
      tags = tags.map((t) => {
        if (selectedTags.includes(t._id)) {
          t.blogCount = t.blogCount + 1
          return t
        } else {
          return t
        }
      })

      blogs.push(blog)
    })

    // Write Comments
    let comments = []
    blogs.forEach((b) => {
      let newComments = GlobalUtils.randomMultipleFromArray(
        DummyData.comments
      ).map(
        (c) =>
          new CommentModel({
            content: c.content,
            user: GlobalUtils.randomSingleFromArray(users)._id,
            blog: b._id,
          })
      )
      comments = [...comments, ...newComments]
    })

    // Write Followers && INcrease User Followers && Increase User Following
    let followers = []
    users.forEach((u) => {
      let SomeUsersExceptOwn = GlobalUtils.randomMultipleFromArray(
        users.filter((fu) => fu._id !== u._id)
      ).map((p) => p._id)

      // Insert Followers Conllections
      SomeUsersExceptOwn.forEach((i) => {
        followers.push(
          new FollowerModel({
            follower: u._id,
            following: i,
          })
        )
      })

      users = users.map((a) => {
        // Increase Followers Count
        if (a._id === u._id) {
          a.followers = a.followers + SomeUsersExceptOwn.length
          return a
        }

        // Increae Following Count
        if (SomeUsersExceptOwn.includes(a._id)) {
          a.following = a.following + 1
          return a
        }

        return a
      })
    })

    // Write Likes And Notifications
    let likes = []
    let notifications = []
    blogs.forEach((b) => {
      GlobalUtils.randomMultipleFromArray(users).forEach((u) => {
        likes.push(new LikeModel({ user: u._id, blog: b._id }))
      })

      let currentUser = users.filter((u) => u._id === b.user)[0]

      followers
        .filter((f) => f.follower === b.user)
        .forEach((u) => {
          notifications.push(
            new NotificationModel({
              user: u.following,
              blog: b._id,
              content: `${currentUser.name} Posted a blog!`,
            })
          )
        })
    })

    await RoleModel.create(roles)
    await UserModel.create(users)
    await CategoryModel.create(categories)
    await SubCategoryModel.create(subCategories)
    await TagModel.create(tags)

    await BlogModel.create(blogs)
    await CommentModel.create(comments)
    await FollowerModel.create(followers)
    await LikeModel.create(likes)
    await NotificationModel.create(notifications)

    // --------------

    console.log('Data Inserted')
    process.exit()
  } catch (error) {
    console.log(`Error: ${error}`)
    process.exit(1)
  }
}

// Destroy Data Seeder:
const destroyData = async () => {
  try {
    //Destroy All
    await UserModel.deleteMany()
    await SessionModel.deleteMany()
    await CategoryModel.deleteMany()
    await SubCategoryModel.deleteMany()
    await TagModel.deleteMany()
    await BlogModel.deleteMany()
    await CommentModel.deleteMany()
    await FollowerModel.deleteMany()
    await LikeModel.deleteMany()
    await NotificationModel.deleteMany()
    await RoleModel.deleteMany()

    console.log('Data Destroyed Successfully')
    process.exit()
  } catch (error) {
    console.log(`Error ${error.message}`)
    process.exit(1)
  }
}

// Manage Seeder Command:
if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}

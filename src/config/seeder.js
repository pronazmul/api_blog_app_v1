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
    await BlogModel.deleteMany()
    await CategoryModel.deleteMany()
    await SubCategoryModel.deleteMany()
    await CommentModel.deleteMany()
    await FollowerModel.deleteMany()
    await LikeModel.deleteMany()
    await TagModel.deleteMany()
    await NotificationModel.deleteMany()
    await RoleModel.deleteMany()

    //Import Data
    let roles = DummyData.roles.map((r) => new RoleModel(r))
    let users = DummyData.users.map(
      (u) =>
        new UserModel({
          ...u,
          role: GlobalUtils.randomSingleFromArray(roles.map((r) => r._id)),
        })
    )

    // Wirte Categories
    let subCategories = []
    let categories = DummyData.categories.map((c) => {
      let category = new CategoryModel({
        name: c.name,
        description: c.description,
        image: c.image,
      })

      subCategories = [
        ...subCategories,
        ...c.subCategories.map(
          (sub) =>
            new SubCategoryModel({
              category: category._id,
              name: sub.name,
              image: sub.image,
              description: sub.description,
            })
        ),
      ]
      return category
    })
    // Write Tags
    let tags = DummyData.tags.map((t) => new TagModel({ name: t.name }))

    // Write Blogs && Update Tags Count
    let blogs = []
    DummyData.blogs.forEach((b) => {
      let blog = new BlogModel({
        ...b,
        user: GlobalUtils.randomSingleFromArray(users)._id,
        category: GlobalUtils.randomSingleFromArray(categories)._id,
        subCategory: GlobalUtils.randomSingleFromArray(subCategories)._id,
        tags: GlobalUtils.randomMultipleFromArray(
          tags.map((t) => t._id),
          3
        ),
      })

      // Update Tags Count
      tags = tags.map((t) => {
        if (blog.tags.includes(t._id)) {
          t.blogCount = t.blogCount + 1
          return t
        } else {
          return t
        }
      })
      blogs.push(blog)
    })

    // console.log(tags)

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

    // Write Likes And Blogs
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

    await RoleModel.insertMany(roles)
    await UserModel.insertMany(users)
    await BlogModel.insertMany(blogs)
    await CategoryModel.insertMany(categories)
    await SubCategoryModel.insertMany(subCategories)
    await CommentModel.insertMany(comments)
    await FollowerModel.insertMany(followers)
    await LikeModel.insertMany(likes)
    await TagModel.insertMany(tags)
    await NotificationModel.insertMany(notifications)

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
    await BlogModel.deleteMany()
    await CategoryModel.deleteMany()
    await SubCategoryModel.deleteMany()
    await CommentModel.deleteMany()
    await FollowerModel.deleteMany()
    await LikeModel.deleteMany()
    await TagModel.deleteMany()
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

import DbConnection from './db.js'

// Configuration
DbConnection.connectMongo()

//Models
import SessionModel from '../models/Session.model.js'
import UserModel from '../models/People.model.js'
import BlogModel from '../models/Blog.model.js'
import CategoryModel from '../models/Category.model.js'
import CommentModel from '../models/Comment.model.js'
import FollowerModel from '../models/Follower.model.js'
import LikeModel from '../models/Like.model.js'
import TagModel from '../models/Tag.model.js'
import NotificationModel from '../models/Notification.model.js'
import RoleModel from '../models/Role.model.js'

// Demo Data
import DummyData from './data.js'
const {
  users,
  blogs,
  categories,
  comments,
  followers,
  likes,
  tags,
  notifications,
  roles,
} = DummyData

// Import Data Seeder:
const importData = async () => {
  try {
    //Destroy All
    await UserModel.deleteMany()
    await SessionModel.deleteMany()
    await BlogModel.deleteMany()
    await CategoryModel.deleteMany()
    await CommentModel.deleteMany()
    await FollowerModel.deleteMany()
    await LikeModel.deleteMany()
    await TagModel.deleteMany()
    await NotificationModel.deleteMany()
    await RoleModel.deleteMany()

    //Import Data
    await UserModel.create(users)
    await BlogModel.create(blogs)
    await CategoryModel.create(categories)
    await CommentModel.create(comments)
    await FollowerModel.create(followers)
    await LikeModel.create(likes)
    await TagModel.create(tags)
    await NotificationModel.create(notifications)
    await RoleModel.create(roles)

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

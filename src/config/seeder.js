import DbConnection from './db.js'

// Configuration
DbConnection.connectMongo()

//Models
import UserModel from '../models/People.model.js'
import SessionModel from '../models/Session.model.js'
import DummyData from './data.js'

// Import Data Seeder:
const importData = async () => {
  try {
    //Destroy All
    await UserModel.deleteMany()
    await SessionModel.deleteMany()

    //Import Users
    const usersArray = await UserModel.create(DummyData.users)
    // const usersIds = usersArray.map((user) => user._id)

    // Imports Blogs
    // const prepareBlogs = Blogs.map((b) => ({ ...b, user: usersIds[0] }))
    // const blogsArray = await _create(prepareBlogs)

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

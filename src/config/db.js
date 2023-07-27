import mongoose from 'mongoose'
import config from './../config/index.js'
import LoggerUtils from '../utils/logger.utils.js'

const { errorLoger, infoLogger } = LoggerUtils

// Initialize Module
const DbConnection = {}

// Connect MongoDB
mongoose.set('strictQuery', true)
DbConnection.connectMongo = async () => {
  try {
    const OPTIONS = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
    await mongoose.connect(config.database_url, OPTIONS)
    infoLogger.info(
      `MongoDB Successfully Connected with ${mongoose.connection.name}`
    )
  } catch (error) {
    errorLoger.error(`Error ${error.message}`)
    process.exit(1)
  }
}

export default DbConnection

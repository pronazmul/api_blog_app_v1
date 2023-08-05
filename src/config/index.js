import { config } from 'dotenv'
import { join } from 'path'

config({ path: join(process.cwd(), '.env') })

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  jwt_expire_time: process.env.JWT_EXPIRE_TIME,
  jwt_secret: process.env.JWT_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  refresh_token: process.env.REFRESH_TOKEN,

  __dirname: process.cwd(),
  filePath: join(process.cwd(), 'public'),
  user_directory: process.env.USER_DIRECTORY,
  category_directory: process.env.CATEGORY_DIRECTORY,
  blog_directory: process.env.BLOG_DIRECTORY,
  default_upload_file_size: process.env.DEFAULT_UPLOAD_FILE_SIZE,
}

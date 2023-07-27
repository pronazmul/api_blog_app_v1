import { readdirSync, unlinkSync, unlink } from 'fs'
import path from 'path'
import multer from 'multer'
import createError from 'http-errors'
import config from './../config/index.js'
import GlobalConst from '../consts/global.const.js'

// Initialize Module
const FilesUtils = {}

FilesUtils.removeAll = (dirName) => {
  let directory = path.join(config.filePath, dirName)
  let files = readdirSync(directory)

  if (!files.length) return 0
  files.forEach((file) => unlinkSync(`${directory}/${file}`))
  return files.length
}

FilesUtils.removeOne = async (dirName, fileName) => {
  try {
    let removedPath = path.join(config.filePath, dirName, fileName)
    unlink(removedPath, (error) => {
      if (error) {
      }
    })
    return true
  } catch (error) {
    return false
  }
}

/**
 * Creates a multer upload object with the specified settings.
 * @param {string} dirName - The directory for storing uploaded files.
 * @param {string[]} allowedFileFormat - An array of allowed file formats (mimetypes).
 * @param {number} maxFileSize - The maximum file size (in bytes) for uploaded files.
 * @param {string} errorMessage - The error message to use when an unsupported file format is uploaded.
 * @returns {Object} A multer upload object with the specified settings.
 */

FilesUtils.multarObject = (
  allowedMimetypes,
  dirName,
  filesize,
  errorMessage
) => {
  let uplaodPath = path.join(config.filePath, dirName)
  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uplaodPath),
    filename: (req, file, cb) => {
      let ext = path.extname(file.originalname)
      let fileName =
        file.originalname.replace(ext, '').split(' ').join('_') +
        '_' +
        Date.now() +
        ext
      cb(null, fileName)
    },
  })

  const upload = multer({
    storage: storage,
    limits: { fileSize: filesize },
    fileFilter: (req, file, cb) => {
      if (allowedMimetypes.includes(file.mimetype)) {
        cb(null, true)
      } else {
        cb(createError(500, errorMessage))
      }
    },
  })
  return upload
}

/**
 * Returns an array of file mimetypes based on the specified array of filetypes.
 *
 * @param {Array<'image' | 'video' | 'pdf' | 'gif' | 'xlsx' | 'doc'>} filetype - Allowed file types to be uploaded
 * @returns {string[]} An array of file mimetypes based on the specified filetypes.
 * @throws {Error} If an invalid filetype is specified.
 */
FilesUtils.allowedMimetypes = (fileTypes) => {
  const { supportedMimetypes } = GlobalConst

  let mimetypes = []
  fileTypes.forEach((type) => {
    if (type in supportedMimetypes) {
      mimetypes = [...mimetypes, ...supportedMimetypes[type]]
    }
  })

  return mimetypes
}

export default FilesUtils

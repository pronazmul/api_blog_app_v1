// External Modules:
import createError from 'http-errors'
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import expressRateLimit from 'express-rate-limit'
import morgan, { token } from 'morgan'
import { join } from 'path'
import config from './../config/index.js'
import MongooseUtils from '../utils/mongoose.utils.js'
import YupUtils from '../utils/yup.utils.js'
import FilesUtils from '../utils/files.utils.js'
import fs from 'fs'

// Initialize Module =
const GlobalMiddlewares = {}

// Customise Morgan:
token('timestamp', () => {
  let day = new Date().toDateString()
  let timestamp = new Date().toLocaleTimeString()
  return `${day}- ${timestamp}`
})

const logFormat =
  ':timestamp :method :url :status :res[content-length] - :response-time ms'

/**
 * @Desc: Global Middlewares
 * @middleware : Rate Limitation Middleware
 * @middleware : Static Path Middleware
 * @middleware : json parser middleware
 * @middleware : cookieParser Middleware
 */

GlobalMiddlewares.middlewares = [
  morgan(logFormat),
  cors({
    origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
    credentials: true,
  }),
  cookieParser(),
  expressRateLimit({
    windowMs: 1 * 60 * 1000, // 1 Munite
    max: 100, // How many Request Excepted Each 1 Munite
    message: 'Too many request from this IP, please try again after 10 Munite',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  }),
  express.static(join(config.__dirname, 'public')),
  express.json(),
  express.urlencoded({ extended: false }),

  // Add Live Server Url to Request Object.
  (req, res, next) => {
    config.server_url = `${req.protocol}://${req.get('host')}`
    next()
  },
]

/**
 *Title : Not Fund Middleware
 *Description: Route Path not fund application second last middleware. This middleware fires when route path missed all endpoints and send a  Send a custom error message to error handling middleware.
 */

GlobalMiddlewares.notFound = (req, res, next) => {
  next(createError(404, `Not Found - ${req.originalUrl}`))
}

/*
 *Title : Custom Error Handler Middleware
 *Description: Application Last Middleware take 4 parameters.This middleware is used to handle errors. Send a custom error message to Client Interface.
 */
GlobalMiddlewares.error = async (error, req, res, next) => {
  // Default Errors
  let statusCode = error?.status || 500
  let message = error?.message || 'Something Went Wrong!'
  let errors = []
  let stack = error?.stack || ''

  // Unlink Uploaded Files If Request Contains
  if (req.files) {
    // Close all streams before attempting to unlink
    req.files.forEach((file) => {
      if (file.stream) {
        file.stream.close()
      }
    })

    // Introduce a small delay before attempting to unlink
    setTimeout(() => {
      FilesUtils.removeReqFiles(req.files)
    }, 1000)
  }

  // Check Yup Validation Error
  if (error?.name === 'ValidationError' && error?.inner?.length) {
    statusCode = 422
    message = 'Validation Error!'
    errors = YupUtils.ValidationError(error.inner)
  }

  // Check MongoDB Validation Error
  if (error?.name === 'ValidationError' && error?._message) {
    statusCode = 422
    message = 'Validation Error!'
    errors = MongooseUtils.ValidationError(error.errors)
  }

  // check Type Error
  if (error instanceof TypeError) {
    statusCode = 422
    message = `Type Error - ${error?.message}`
  }

  const errorMessage =
    process.env.NODE_ENV === 'production'
      ? { success: false, data: null, message, errors }
      : { success: false, data: null, message, errors, stack }

  res.status(statusCode).json(errorMessage)
}

// MOdule Exports:
export default GlobalMiddlewares

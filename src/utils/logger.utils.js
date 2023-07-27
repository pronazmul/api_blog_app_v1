import { createLogger, format, transports } from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
import path from 'path'

// Initialize Module
const LoggerUtils = {}

// Format Logs
const { printf, combine, timestamp, label } = format
const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp)
  const hour = date.getHours()
  const munites = date.getMinutes()
  const seconds = date.getSeconds()
  return `${date.toDateString()} ${hour}:${munites}:${seconds} [${label}] ${level}: ${message}`
})

LoggerUtils.infoLogger = createLogger({
  level: 'info',
  format: combine(label({ label: 'Nazmul-Success' }), timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'successes',
        '%DATE%-success.log'
      ),
      datePattern: 'YYYY-DD-MM-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '10d',
    }),
  ],
})

LoggerUtils.errorLoger = createLogger({
  level: 'error',
  format: combine(label({ label: 'Nazmul-Error' }), timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(process.cwd(), 'logs', 'errors', '%DATE%-error.log'),
      datePattern: 'YYYY-DD-MM-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '10d',
    }),
  ],
})

export default LoggerUtils

const winston = require('winston');
require('winston-mongodb');

const logger = winston.createLogger({
  level: 'error',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({ filename: 'error.log' }),
  ],
});

logger.error('Test error logging to MongoDB');

// winson.add(winston.transports.Mongodb, {db: 'mongodb://vidly-db/logs'});
new winston.transports.MongoDB({
  db: 'mongodb://localhost/vidly-db', // MongoDB connection URI
  collection: 'log_entries', // Collection where logs will be stored
  level: 'error', // Log only error-level messages
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
}),


module.exports = logger;

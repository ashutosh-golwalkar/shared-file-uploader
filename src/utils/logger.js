const winston = require('winston');
const packageName = require('../../package.json');

const logFormatter = winston.format.printf((info) => {
  const { timestamp, level, stack, message } = info;
  const errorMessage = stack || message;

  const symbols = Object.getOwnPropertySymbols(info);
  if (info[symbols[0]] !== 'error') {
    return `${timestamp} ${level}: ${message}`;
  }

  return `${timestamp} ${level}: ${errorMessage}`;
});

const logger = winston.createLogger({
  maxsize: 5242880, // 5MB
  maxFiles: 5,
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: `${packageName.name.toLocaleLowerCase()}-service` },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(),
        logFormatter)
    })
  ]
});

module.exports = logger;

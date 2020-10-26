const path = require("path");
const { createLogger, transports, format } = require("winston");

const options = {
  fileInfo: {
    level: "info",
    filename: `${path.join(__dirname, "..")}/logs/app.log`,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  fileError: {
    level: "error",
    filename: `${path.join(__dirname, "..")}/logs/error.log`,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },

  fileException: {
    level: "error",
    filename: `${path.join(__dirname, "..")}/logs/exception.log`,
    json: true,
    handleExceptions: true,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    handleRejections: true,
    json: false,
    colorize: true,
  },
};

const logger = createLogger({
  transports: [
    new transports.File(options.fileInfo),
    new transports.File(options.fileError),
    new transports.File(options.fileException),
    // new transports.Console(options.console),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

logger.stream = {
  write: function (message, encoding) {
    logger.info(message);
  },
};

module.exports = logger;

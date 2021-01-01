const winston = require("winston");

const addDate = winston.format((info) => {
  info.message = `${new Date().toISOString()} ${info.message}`;
  return info;
});

module.exports = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: "debug",
      handleExceptions: true,
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      level: "debug",
      handleExceptions: true,
      format: winston.format.combine(addDate(), winston.format.simple()),
      dirname: `${__dirname}`,
      filename: "log.log",
      maxFiles: 5,
      maxsize: 5120000,
    }),
  ],
});

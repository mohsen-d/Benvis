const winston = require("winston");
require("express-async-errors");

module.exports = function () {
  if (process.env.NODE_ENV !== "production") {
    winston.add(
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.colorize(),
          winston.format.prettyPrint()
        ),
        handleRejections: true,
        handleExceptions: true,
      })
    );
  }

  winston.add(
    new winston.transports.File({
      filename: "logs.log",
      handleRejections: true,
      handleExceptions: true,
    })
  );
};

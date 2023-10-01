const winston = require("winston");

module.exports = function (err, req, res, next) {
  winston.error(err.message, err);

  return req.xhr ? res.status(500).json(err) : res.redirect("/error");
};

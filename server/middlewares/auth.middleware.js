const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
  try {
    req.user = jwt.verify(req.cookies.auth_token, "124").username;
  } catch (ex) {
    return res.redirect("/auth/login");
  }
  next();
}

module.exports = authenticate;

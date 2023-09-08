const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
  try {
    res.locals = {
      user: jwt.verify(req.cookies.auth_token, process.env.BENVIS_JWTOKEN)
        .username,
    };
  } catch (ex) {
    return res.redirect("/auth/login");
  }
  next();
}

module.exports = authenticate;

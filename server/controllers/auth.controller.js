const model = require("../models/auth.model");
const jwt = require("jsonwebtoken");

function getLogin(req, res) {
  return res.render("login");
}

async function login(req, res) {
  const { username, password } = req.body;
  const user = await model.getUser();

  if (username !== user.username || password !== user.password)
    return res.status(401).json({
      error: "invalid username or password",
    });

  const token = jwt.sign({ username: user.username }, "124");

  return res
    .header(
      "Set-Cookie",
      `auth_token=${token}; HttpOnly; SameSite=Strict; path=/; Max-Age=${
        30 * 60
      }`
    )
    .json({
      token,
    });
}

function logout(req, res) {
  return res
    .header(
      "Set-Cookie",
      `auth_token=invalid; HttpOnly; SameSite=Strict; path=/; Max-Age=-1`
    )
    .redirect("/auth/login");
}

module.exports = {
  getLogin,
  login,
  logout,
};

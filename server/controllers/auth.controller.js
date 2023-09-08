const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const model = require("../models/auth.model");

function getLogin(req, res) {
  return res.render("login");
}

async function login(req, res) {
  const { username, password } = req.body;
  const user = await model.getUser();

  if (username !== user.username)
    return res.status(401).json({
      error: "invalid username or password",
    });

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid)
    return res.status(401).json({
      error: "invalid username or password",
    });

  const token = jwt.sign(
    { username: user.username },
    process.env.BENVIS_JWTOKEN
  );

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

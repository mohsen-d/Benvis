const jwt = require("jsonwebtoken");

const model = require(`../models/${process.env.BENVIS_DB}/auth.model`);

function getLogin(req, res) {
  return res.render("login");
}

async function login(req, res) {
  const { username, password } = req.body;

  const isValidUser = model.checkUser(username, password);

  if (!isValidUser)
    return res.status(401).json({
      error: "invalid username or password",
    });

  const token = jwt.sign({ username }, process.env.BENVIS_JWTOKEN);

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

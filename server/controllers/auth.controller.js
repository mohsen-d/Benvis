const model = require("../models/auth.model");

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

  return res.json({
    username: user.username,
  });
}

module.exports = {
  getLogin,
  login,
};

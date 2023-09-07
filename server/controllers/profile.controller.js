const model = require("../models/auth.model");

function getProfile(req, res) {
  res.render("adminProfile", {
    layout: "layouts/admin",
    user: req.user,
    title: "Profile",
  });
}

async function changePassword(req, res) {
  const { currentPassword, newPassword } = req.body;

  const user = await model.getUser();

  if (currentPassword !== user.password)
    return res.status(401).json({
      error: "invalid password",
    });

  await model.changePassword(newPassword);
  return res.sendStatus(200);
}

module.exports = {
  getProfile,
  changePassword,
};

const bcrypt = require("bcrypt");

const model = require(`../models/${process.env.BENVIS_DB}/auth.model`);

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

  const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

  if (!isPasswordValid)
    return res.status(401).json({
      error: "invalid password",
    });

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(newPassword, salt);

  await model.changePassword(passwordHash);

  return res.sendStatus(200);
}

module.exports = {
  getProfile,
  changePassword,
};

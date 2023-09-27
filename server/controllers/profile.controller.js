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

  const isPasswordValid = await model.checkPassword(currentPassword);

  if (!isPasswordValid)
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

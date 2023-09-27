const model = require(`../models/${process.env.BENVIS_DB}/settings.model`);

async function getSettings(req, res) {
  const siteSettings = await model.getSettings();
  res.render("adminSettings", {
    layout: "layouts/admin",
    title: "Settings",
    siteSettings,
  });
}

async function updateSettings(req, res) {
  const newSettings = req.body;
  await model.updateSettings(newSettings);
  req.app.locals.siteSettings = newSettings;
  res.json(newSettings);
}

module.exports = {
  getSettings,
  updateSettings,
};

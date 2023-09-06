const model = require("../models/settings.model");

async function getSettings(req, res) {
  const { title, description, footer } = await model.getSettings();
  res.render("adminSettings", {
    title: "Settings",
    siteSettings: {
      title,
      description,
      footer,
    },
  });
}

async function updateSettings(req, res) {
  const newSettings = req.body;
  await model.updateSettings(newSettings);
  res.json(newSettings);
}

module.exports = {
  getSettings,
  updateSettings,
};

const mongoose = require("mongoose");

const Settings = mongoose.model(
  "Settings",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    footer: {
      type: String,
      required: true,
    },
    landingPage: {
      type: Boolean,
    },
  })
);

(async function () {
  let settings = await getSettings();
  if (!settings) {
    settings = new Settings({
      title: "Untitled",
      description: "A short description",
      footer: "Powered By Benvis",
      landingPage: true,
    });

    await settings.save();
  }
})();

async function getSettings() {
  return await Settings.findOne();
}

async function updateSettings(newSettings) {
  const settings = await getSettings();

  settings.title = newSettings.title;
  settings.description = newSettings.description;
  settings.footer = newSettings.footer;
  settings.landingPage = newSettings.landingPage;

  await settings.save();
}

module.exports = {
  getSettings,
  updateSettings,
};

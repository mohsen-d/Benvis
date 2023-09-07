const model = require("../models/settings.model");

module.exports = async function (app) {
  app.locals.siteSettings = await model.getSettings();
};

const model = require(`../models/${process.env.BENVIS_DB}/settings.model`);

module.exports = async function (app) {
  app.locals.siteSettings = await model.getSettings();
};

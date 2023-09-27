const express = require("express");
const path = require("path");
var hbs = require("hbs");

const app = express();

hbs.localsAsTemplateData(app);
hbs.registerPartials(path.join(__dirname, "views", "partials"));

(async () => {
  await require("./startup/db.startup")();
  await require("./startup/settings.startup")(app);
  require("./startup/routes.startup")(app);
})();

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, ".", "views"));

module.exports = app;

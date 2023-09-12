const express = require("express");
const path = require("path");
var hbs = require("hbs");

const app = express();

hbs.localsAsTemplateData(app);
require("./startup/settings.startup")(app);
require("./startup/routes.startup")(app);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, ".", "views"));

module.exports = app;

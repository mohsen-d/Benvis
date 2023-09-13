const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const routingMode = process.env.BENVIS_ROUTING_MODE || "normal";

function normalRouting(app) {
  app.use("/admin/", require("../middlewares/auth.middleware"));

  app.use("/admin", require("../routes/admin/home.route"));
  app.use("/admin/posts", require("../routes/admin/posts.route"));
  app.use("/admin/profile", require("../routes/admin/profile.route"));
  app.use("/admin/about", require("../routes/admin/about.route"));
  app.use("/admin/settings", require("../routes/admin/settings.route"));
  app.use("/auth", require("../routes/auth.route"));
  app.use("/posts", require("../routes/posts.route"));
  app.use("/", require("../routes/home.route"));
}

function vercelRouting(app) {
  const vercelit = require("../utils/vercelRouting");
  return vercelit(app, path.join(__dirname, "..", "routes"));
}

module.exports = function (app) {
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.static(path.join(__dirname, "..", "public")));

  switch (routingMode) {
    case "normal":
      normalRouting(app);
      break;
    case "vercel":
      vercelRouting(app);
      break;
  }

  app.get("*", (req, res) => {
    res.render("404", { layout: "layouts/public" });
  });
};

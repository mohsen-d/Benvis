const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

const routingMode = process.env.BENVIS_ROUTING_MODE || "normal";

function normalRouting(app) {
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
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          "img-src": ["*"],
          "script-src-attr": ["'unsafe-inline'"],
          "script-src": [
            "'self'",
            "'unsafe-inline'",
            "https://cdn.quilljs.com/1.3.6/quill.min.js",
            "https://cdn.jsdelivr.net/",
          ],
        },
      },
    })
  );

  app.use(cookieParser());
  app.use(express.json());
  app.use(express.static(path.join(__dirname, "..", "public/scripts")));
  app.use(express.static(path.join(__dirname, "..", "public/styles")));
  app.use(express.static(path.join(__dirname, "..", "public/images")));

  app.use("/admin/", require("../middlewares/auth.middleware"));

  switch (routingMode) {
    case "normal":
      normalRouting(app);
      break;
    case "vercel":
      vercelRouting(app);
      break;
  }

  app.use(require("../routes/errors.route"));

  app.use(require("../middlewares/error.middleware"));
};

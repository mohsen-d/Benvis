const express = require("express");

const aboutController = require("../controllers/about.controller");
const postsController = require("../controllers/posts.controller");

const route = express.Router();

route.get("/", (req, res) => {
  return req.app.locals.siteSettings.landingPage
    ? aboutController.getInfo(req, res)
    : postsController.getPosts(req, res);
});

module.exports = route;

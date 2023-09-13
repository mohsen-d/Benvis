const express = require("express");

const postsController = require("../../controllers/posts.controller");

const route = express.Router();

route.get("/", (req, res) => {
  return postsController.getPosts(req, res);
});

module.exports = route;

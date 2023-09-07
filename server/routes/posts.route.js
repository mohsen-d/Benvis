const express = require("express");

const controller = require("../controllers/posts.controller");

const route = express.Router();

route.get("/", controller.getPosts);
route.get("/:id", controller.getPost);

module.exports = route;

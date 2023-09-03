const express = require("express");

const controller = require("../../controllers/posts.controller");

const route = express.Router();

// APIs
route.post("/", controller.addPost);
route.put("/:id", controller.updatePost);
route.delete("/:id", controller.deletePost);

// Pages
route.get("/", controller.getPosts);
route.get("/new", controller.newPost);
route.get("/:id", controller.getPost);

module.exports = route;

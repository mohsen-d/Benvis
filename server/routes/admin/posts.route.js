const express = require("express");
const cookieParser = require("cookie-parser");

const controller = require("../../controllers/posts.controller");
const authMiddleware = require("../../middlewares/auth.middleware");

const route = express.Router();

route.use(cookieParser());
route.use(authMiddleware);

// APIs
route.post("/", controller.addPost);
route.put("/:id", controller.updatePost);
route.delete("/:id", controller.deletePost);

// Pages
route.get("/", controller.getPosts);
route.get("/new", controller.newPost);
route.get("/:id", controller.getPost);

module.exports = route;

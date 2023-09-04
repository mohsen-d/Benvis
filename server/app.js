const express = require("express");
const path = require("path");

const postsAdminRoutes = require("./routes/admin/posts.route");
const authRoutes = require("./routes/auth.route");

const app = express();

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, ".", "views"));

app.use(express.json());
app.use(express.static(path.join(__dirname, ".", "public")));

app.use("/admin/posts", postsAdminRoutes);
app.use("/auth", authRoutes);

module.exports = app;

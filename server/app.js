const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const authMiddleware = require("./middlewares/auth.middleware");

const postsAdminRoutes = require("./routes/admin/posts.route");
const adminProfileRoutes = require("./routes/admin/profile.route");
const settingsRoutes = require("./routes/admin/settings.route");
const authRoutes = require("./routes/auth.route");
const postsRoutes = require("./routes/posts.route");

const app = express();

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, ".", "views"));

app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, ".", "public")));

app.use("/admin/", authMiddleware);

app.use("/admin/posts", postsAdminRoutes);
app.use("/admin/profile", adminProfileRoutes);
app.use("/admin/settings", settingsRoutes);
app.use("/auth", authRoutes);
app.use("/posts", postsRoutes);

module.exports = app;

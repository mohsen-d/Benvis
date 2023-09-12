const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
var hbs = require("hbs");

const app = express();

hbs.localsAsTemplateData(app);
require("./startup/settings.startup")(app);

const authMiddleware = require("./middlewares/auth.middleware");

const postsAdminRoutes = require("./routes/admin/posts.route");
const adminProfileRoutes = require("./routes/admin/profile.route");
const adminAboutRoutes = require("./routes/admin/about.route");
const settingsRoutes = require("./routes/admin/settings.route");
const authRoutes = require("./routes/auth.route");
const postsRoutes = require("./routes/posts.route");
const homeRoutes = require("./routes/home.route");

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, ".", "views"));

app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, ".", "public")));

app.use("/admin/", authMiddleware);

app.use("/admin/posts", postsAdminRoutes);
app.use("/admin/profile", adminProfileRoutes);
app.use("/admin/about", adminAboutRoutes);
app.use("/admin/settings", settingsRoutes);
app.use("/auth", authRoutes);
app.use("/posts", postsRoutes);
app.use("/", homeRoutes);

app.get("*", (req, res) => {
  res.render("404", { layout: "layouts/public" });
});

module.exports = app;

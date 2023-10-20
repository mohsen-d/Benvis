const model = require(`../models/${process.env.BENVIS_DB}/about.model`);
const postsModel = require(`../models/${process.env.BENVIS_DB}/post.model`);
const { isAdminRoute } = require("../utils/misc");

async function getInfo(req, res) {
  const info = await model.getInfo();

  let viewToRender = "adminEditAbout";
  let layout = "layouts/admin";

  if (!isAdminRoute(req)) {
    viewToRender = "about";
    layout = "";
    info.hasPosts = await postsModel.hasPosts();
  }

  res.render(viewToRender, {
    layout: layout,
    title: "About",
    info,
  });
}

async function updateInfo(req, res) {
  const newInfo = req.body;

  await model.updateInfo(newInfo);
  res.json(newInfo);
}

module.exports = {
  getInfo,
  updateInfo,
};

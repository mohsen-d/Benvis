const model = require("../models/about.model");

async function getInfo(req, res) {
  const info = await model.getInfo();

  let viewToRender = "adminEditAbout";
  let layout = "layouts/admin";

  if (!req.baseUrl.startsWith("/admin")) {
    viewToRender = "about";
    layout = "";
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

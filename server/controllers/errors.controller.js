function serverError(req, res) {
  res.render("500", { layout: "layouts/public" });
}

function notFoundError(req, res) {
  res.render("404", { layout: "layouts/public" });
}

module.exports = {
  serverError,
  notFoundError,
};

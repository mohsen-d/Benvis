function isAdminRoute(req) {
  return req.baseUrl.startsWith("/admin") || req.path.startsWith("/admin");
}

module.exports = {
  isAdminRoute,
};

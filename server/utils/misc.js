function isAdminRoute(req) {
  return req.baseUrl.startsWith("/admin") || req.path.startsWith("/admin");
}

function generateMessage(req) {
  if (!req.query.from) {
    return "";
  }

  switch (req.query.from) {
    case "newpost":
      return "New post added successfully";
    case "updatepost":
      return "post updated successfully";
    case "deletepost":
      return "post deleted successfully";
    case "about":
      return "About details updated successfully";
    case "settings":
      return "Site settings updated successfully";
    case "profile":
      return "Admin password changed successfully";
  }
}

function generateError(req) {
  if (req.query.error) {
    return "Something went wrong. Please try again!";
  }

  return "";
}

module.exports = {
  isAdminRoute,
  generateMessage,
  generateError,
};

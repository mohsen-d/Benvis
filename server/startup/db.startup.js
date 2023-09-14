const mongoose = require("mongoose");

const db = process.env.BENVIS_DB || "mongodb";

module.exports = function () {
  if (db === "mongodb") {
    const conStr = process.env.MONGODB_URI;
    mongoose
      .connect(conStr)
      .then(() => console.log(`Connected to ${conStr}...`));
  }
};

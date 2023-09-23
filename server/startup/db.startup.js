const mongoose = require("mongoose");

const db = process.env.BENVIS_DB || "mongodb";

module.exports = async function () {
  if (db === "mongodb") {
    const conStr = process.env.MONGODB_URI;
    await mongoose.connect(conStr);
    console.log(`Connected to ${conStr}...`);
  }
};

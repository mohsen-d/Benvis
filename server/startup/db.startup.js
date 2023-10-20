const mongoose = require("mongoose");
const fs = require("fs").promises;
const path = require("path");

const db = process.env.BENVIS_DB || "mongodb";

module.exports = async function () {
  if (db === "mongodb") {
    const conStr = process.env.MONGODB_URI;
    await mongoose.connect(conStr);
    console.log(`Connected to ${conStr}...`);
  } else {
    const dataFolderPath = path.join(__dirname, "..", "data");
    await fs.mkdir(dataFolderPath, { recursive: true });
  }
};

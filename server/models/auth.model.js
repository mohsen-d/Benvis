const fs = require("fs").promises;
const path = require("path");

const dataPath = path.join(__dirname, ".", "auth.json");

async function getUser() {
  const data = await fs.readFile(dataPath, "utf-8");
  return JSON.parse(data).creds;
}

module.exports = {
  getUser,
};

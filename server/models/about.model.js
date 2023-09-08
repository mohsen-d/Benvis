const fs = require("fs").promises;
const path = require("path");

const dataPath = path.join(__dirname, ".", "about.json");

async function getInfo() {
  const data = await fs.readFile(dataPath, "utf-8");
  return JSON.parse(data);
}

async function updateInfo(newInfo) {
  await fs.writeFile(dataPath, JSON.stringify(newInfo, null, 2));
}

module.exports = {
  getInfo,
  updateInfo,
};

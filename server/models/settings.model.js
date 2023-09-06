const fs = require("fs").promises;
const path = require("path");

const dataPath = path.join(__dirname, ".", "settings.json");

async function getSettings() {
  const data = await fs.readFile(dataPath, "utf-8");
  return JSON.parse(data);
}

async function updateSettings(newSettings) {
  await fs.writeFile(dataPath, JSON.stringify(newSettings, null, 2));
}

module.exports = {
  getSettings,
  updateSettings,
};

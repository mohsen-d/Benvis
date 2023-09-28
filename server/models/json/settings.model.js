const fs = require("fs").promises;
const path = require("path");

const dataPath = path.join(__dirname, "..", "..", "data", "settings.json");

(async function createFile() {
  const fileContent = {
    title: "Untitled",
    description: "A short description",
    footer: "Powered By Benvis",
    landingPage: true,
  };

  try {
    await fs.writeFile(dataPath, JSON.stringify(fileContent, null, 2), {
      flag: "wx",
    });
  } catch {}
})();

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

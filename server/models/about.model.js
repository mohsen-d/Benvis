const fs = require("fs").promises;
const path = require("path");

const dataPath = path.join(__dirname, "..", "data", "about.json");

(async function createFile() {
  const fileContent = {
    name: "YOUR NAME",
    position: "YOUR POSITION",
    email: "YOUR EMAIL",
    linkedin: "https://www.linkedin.com",
    twitter: "",
    stackoverflow: "https://stackoverflow.com/",
    github: "https://github.com/",
    instagram: "",
    image: "/profile.webp",
    bio: "",
  };

  try {
    await fs.writeFile(dataPath, JSON.stringify(fileContent, null, 2), {
      flag: "wx",
    });
  } catch {}
})();

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

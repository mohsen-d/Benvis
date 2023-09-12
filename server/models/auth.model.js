const fs = require("fs").promises;
const path = require("path");

const dataPath = path.join(__dirname, ".", "data", "auth.json");

async function getUser() {
  const data = await fs.readFile(dataPath, "utf-8");
  return JSON.parse(data).creds;
}

async function changePassword(newPassword) {
  const fileContent = await fs.readFile(dataPath, "utf-8");
  const data = JSON.parse(fileContent);

  data.creds.password = newPassword;

  await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
}

module.exports = {
  getUser,
  changePassword,
};

const fs = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const dataPath = path.join(__dirname, "..", "data", "auth.json");

(async function createFile() {
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash("", salt);

  const fileContent = {
    creds: {
      username: "admin",
      password: passwordHash,
    },
  };

  try {
    await fs.writeFile(dataPath, JSON.stringify(fileContent, null, 2), {
      flag: "wx",
    });
  } catch {}
})();

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

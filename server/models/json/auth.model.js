const fs = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const dataPath = path.join(__dirname, "..", "data", "auth.json");

(async function createFile() {
  const passwordHash = await passwordHash("");

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

  data.creds.password = await passwordHash(newPassword);

  await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
}

async function checkPassword(password) {
  const user = await getUser();
  return await bcrypt.compare(password, user.password);
}

async function checkUser(username, password) {
  const user = await getUser();
  if (username !== user.username) return false;
  return await bcrypt.compare(password, user.password);
}

async function passwordHash(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

module.exports = {
  getUser,
  changePassword,
  checkPassword,
  checkUser,
};

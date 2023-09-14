const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Auth = mongoose.model(
  "Auth",
  new mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  })
);

(async function () {
  let user = await getUser();
  if (!user) {
    const password = await passwordHash("");
    user = new Auth({ username: "admin", password });
    await user.save();
  }
})();

async function getUser() {
  const user = await Auth.findOne({ username: "admin" });
  return user;
}

async function changePassword(newPassword) {
  const user = await getUser();
  user.password = passwordHash(newPassword);
  await user.save();
}

async function passwordHash(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

module.exports = {
  getUser,
  changePassword,
};

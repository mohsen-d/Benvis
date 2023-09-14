const mongoose = require("mongoose");

const About = mongoose.model(
  "About",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    linkedin: {
      type: String,
    },
    twitter: {
      type: String,
    },
    stackoverflow: {
      type: String,
    },
    github: {
      type: String,
    },
    instagram: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
  })
);

(async function () {
  let info = await getInfo();
  if (!info) {
    info = new About({
      name: "YOUR NAME",
      position: "YOUR POSITION",
      email: "YOUR EMAIL",
      linkedin: "https://www.linkedin.com",
      twitter: "",
      stackoverflow: "https://stackoverflow.com/",
      github: "https://github.com/",
      instagram: "",
      image: "/profile.webp",
      bio: "A short bio...",
    });

    await info.save();
  }
})();

async function getInfo() {
  return await About.findOne();
}

async function updateInfo(newInfo) {
  const info = await getInfo();

  Object.assign(info, newInfo);

  await info.save();
}

module.exports = {
  getInfo,
  updateInfo,
};

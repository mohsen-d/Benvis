const fs = require("fs").promises;
const path = require("path");

const dataPath = path.join(__dirname, ".", "data.json");

function getPostPath(id) {
  const postFileName = `${id}.json`;
  return path.join(__dirname, ".", "posts", postFileName);
}

async function getPosts() {
  const data = await fs.readFile(dataPath, "utf-8");
  return JSON.parse(data).posts;
}

async function getPost(id) {
  const data = await fs.readFile(getPostPath(id), "utf-8");
  return JSON.parse(data);
}

async function addPost(post) {
  const fileContent = await fs.readFile(dataPath, "utf-8");
  const data = JSON.parse(fileContent);
  data.lastId += 1;
  data.posts.push({
    [data.lastId]: `${post.title}##${post.text.substring(0, 50)}`,
  });
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2));

  post.date = Date.now();
  await fs.writeFile(getPostPath(data.lastId), JSON.stringify(post, null, 2));
  return post;
}

async function deletePost(id) {
  await fs.rm(getPostPath(id));

  const fileContent = await fs.readFile(dataPath, "utf-8");
  const data = JSON.parse(fileContent);

  const postIndex = data.posts.findIndex((p) => p.hasOwnProperty(id));
  const post = data.posts[postIndex];

  data.posts.splice(postIndex, 1);
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
  return post;
}

async function updatePost(id, post) {
  const fileContent = await fs.readFile(dataPath, "utf-8");
  const data = JSON.parse(fileContent);

  const postIndex = data.posts.findIndex((p) => p.hasOwnProperty(id));
  data.posts.splice(postIndex, 1, {
    [id]: `${post.title}##${post.text.substring(0, 50)}`,
  });
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2));

  post.date = Date.now();
  await fs.writeFile(getPostPath(id), JSON.stringify(post, null, 2));

  return post;
}

module.exports = {
  getPosts,
  getPost,
  addPost,
  deletePost,
  updatePost,
};

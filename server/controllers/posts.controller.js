const model = require("../models/post.model");

async function getPosts(req, res) {
  const data = await model.getPosts();
  const posts = data.map((p) => {
    const id = Object.keys(p)[0];
    const [title, content] = p[id].split("##");
    return { id, title, content };
  });
  return res.render("adminPostsList", { posts });
}

async function getPost(req, res) {
  const id = req.params.id;
  const post = await model.getPost(id);
  res.render("adminEditPost", post);
}

function newPost(req, res) {
  res.render("adminNewPost");
}

async function addPost(req, res) {
  const post = req.body;
  await model.addPost(post);
  res.json(post);
}

async function deletePost(req, res) {
  const id = req.params.id;
  const post = await model.deletePost(id);
  return res.json(post);
}

async function updatePost(req, res) {
  const post = req.body;
  const id = req.params.id;
  console.log(id, post);
  await model.updatePost(id, post);
  return res.json(post);
}

module.exports = {
  getPosts,
  getPost,
  newPost,
  addPost,
  deletePost,
  updatePost,
};
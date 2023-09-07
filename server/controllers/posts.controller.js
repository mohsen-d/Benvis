var QuillConverter = require("quill-delta-to-html").QuillDeltaToHtmlConverter;

const model = require("../models/post.model");

async function getPosts(req, res) {
  const data = await model.getPosts();
  const posts = data.map((p) => {
    const id = Object.keys(p)[0];
    const [title, content] = p[id].split("##");
    return { id, title, content };
  });

  let viewToRender = "adminPostsList";
  let layout = "layouts/admin";

  if (!req.baseUrl.startsWith("/admin")) {
    viewToRender = "posts";
    layout = "layouts/public";
  }

  return res.render(viewToRender, {
    layout: layout,
    user: req.user,
    title: "Posts",
    posts,
  });
}

async function getPost(req, res) {
  const id = req.params.id;
  const post = await model.getPost(id);

  let viewToRender = "adminEditPost";
  let content = JSON.stringify(post.content);
  let layout = "layouts/admin";

  if (!req.baseUrl.startsWith("/admin")) {
    viewToRender = "post";
    content = convertContentToHtml(post.content);
    layout = "layouts/public";
  }

  res.render(viewToRender, {
    layout: layout,
    title: post.title,
    content,
  });
}

function newPost(req, res) {
  res.render("adminNewPost", { title: "New Post", layout: "layouts/admin" });
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
  await model.updatePost(id, post);
  return res.json(post);
}

function convertContentToHtml(content) {
  var converter = new QuillConverter(content, { encodeHtml: false });
  return converter.convert();
}

module.exports = {
  getPosts,
  getPost,
  newPost,
  addPost,
  deletePost,
  updatePost,
};

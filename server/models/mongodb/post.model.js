const mongoose = require("mongoose");

const Post = mongoose.model(
  "Posts",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    brief: {
      type: String,
      default: "",
    },
    content: {
      type: Object,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
  })
);

async function getPosts() {
  const posts = await Post.find().sort({ date: "desc" });
  posts.forEach((p) => (p.id = p._id));
  return posts;
}

async function getPost(id) {
  const post = await Post.findOne({ _id: id });
  if (!post) {
    throw new Error("post not found");
  }
  return post;
}

async function addPost({ title, content, text }) {
  const newPost = new Post({ title, content, brief: text.substring(0, 150) });
  await newPost.save();
  return newPost;
}

async function deletePost(id) {
  return await Post.findOneAndDelete({ _id: id });
}

async function updatePost(id, { title, content, text }) {
  const post = await getPost(id);
  Object.assign(post, { title, content, brief: text.substring(0, 150) });
  await post.save();
  return post;
}

module.exports = {
  getPosts,
  getPost,
  addPost,
  deletePost,
  updatePost,
};

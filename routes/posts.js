const express = require("express");
const Post = require("../models/post");
const auth = require("../middleware/auth");
const router = new express.Router();

router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "email");
    res.send(posts);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/posts", auth, async (req, res) => {
  const post = new Post({
    ...req.body,
    author: req.user._id,
  });

  try {
    await post.save();
    res.status(201).send(post);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "email");
    if (!post) {
      return res.status(404).send();
    }
    res.send(post);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/posts/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    const post = await Post.findOne({
      _id: req.params.id,
      author: req.user._id,
    });
    if (!post) {
      return res.status(404).send();
    }
    updates.forEach((update) => (post[update] = req.body[update]));
    await post.save();
    res.send(post);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/posts/:id", auth, async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.id,
      author: req.user._id,
    });
    if (!post) {
      return res.status(404).send();
    }
    res.send({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

const express = require("express");
const Comment = require("../models/comment");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/comments/:postId", auth, async (req, res) => {
  const comment = new Comment({
    ...req.body,
    post: req.params.postId,
    author: req.user._id,
  });

  try {
    await comment.save();
    res.status(201).send(comment);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/comments/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    const comment = await Comment.findOne({
      _id: req.params.id,
      author: req.user._id,
    });
    if (!comment) {
      return res.status(404).send();
    }
    updates.forEach((update) => (comment[update] = req.body[update]));
    await comment.save();
    res.send(comment);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/comments/:id", auth, async (req, res) => {
  try {
    const comment = await Comment.findOneAndDelete({
      _id: req.params.id,
      author: req.user._id,
    });
    if (!comment) {
      return res.status(404).send();
    }
    res.send({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

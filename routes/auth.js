const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = new express.Router();

router.post("/auth/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = jwt.sign({ _id: user._id }, "your_jwt_secret");
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/auth/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await user.comparePassword(req.body.password))) {
      return res.status(400).send({ error: "Invalid login credentials" });
    }
    const token = jwt.sign({ _id: user._id }, "your_jwt_secret");
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/auth/logout", (req, res) => {
  // Invalidate JWT token by simply responding with a confirmation message.
  res.send({ message: "User logged out successfully" });
});

module.exports = router;

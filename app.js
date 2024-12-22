const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comments");

const app = express();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/blog";

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

app.use(authRoutes);
app.use(postRoutes);
app.use(commentRoutes);

module.exports = app;

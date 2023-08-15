const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  // Thêm các trường khác nếu cảm thấy cần thiết
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;

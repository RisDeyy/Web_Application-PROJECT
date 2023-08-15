const { Router } = require("express");
const router = Router();
const Blog = require("../../models/Blog"); // Sử dụng model cho Blog

// Hàm để tạo bài đăng mới trong blog
exports.createBlogPost = async (req, res) => {
  const { title, content, author } = req.body;

  try {
    const newBlogPost = new Blog({
      title: title,
      content: content,
      author: author,
    });
    await newBlogPost.save();

    return res.status(201).json(newBlogPost);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

// Hàm để lấy danh sách các bài đăng trong blog
exports.getBlogPosts = async (req, res) => {
  try {
    const blogPosts = await Blog.find();

    return res.status(200).json(blogPosts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

module.exports = router;
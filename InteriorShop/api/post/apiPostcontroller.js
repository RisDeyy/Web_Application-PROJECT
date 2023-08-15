const Blog = require("../../models/Post"); // Sử dụng model cho Blog
const Comments = require("../../models/Comments");

// Hàm để tạo bài đăng mới trong post
exports.Post = async (req, res) => {
  const { idPost, idAuthor, avatar, author, points, createAt, postTitle, content, listImg, listComments } = req.body;

  try {
    const newPost = new Post({
      idPost: idPost,
      idAuthor: idAuthor,
      avatar: avatar,
      points: points,
      createAt: createAt,
      postTitle: postTitle,
      content: content,
      author: author,
    });
    return res.status(201).json(newPost);

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

// Hàm để lấy danh sách các bài đăng trong blog
exports.getPosts = async (req, res) => {
  let perPage = 6,
    page = Math.max(parseInt(req.param("page")) || 1, 1);
  if (req.param("page") == null) {
    page = 1;
  }

  try {you
    const Posts = await newPost.find();

    return res.status(200).json(Posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

module.exports = router;
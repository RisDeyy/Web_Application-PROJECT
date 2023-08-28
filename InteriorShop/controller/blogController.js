const Post = require('../models/post');
const Comment = require('../models/comment');

exports.writePost = async (req, res) => {
  const { title, content, author } = req.body;
  const newPost = new Post({ title, content, author });
  try {
    await newPost.save();
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

exports.getPost = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await Post.findById(postId).populate('comments');
    res.render('post', { post });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

exports.addComment = async (req, res) => {
  const postId = req.params.id;
  const { content, author } = req.body;
  const newComment = new Comment({ postId, content, author });
  try {
    await newComment.save();
    res.redirect(`/post/${postId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

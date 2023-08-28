const express = require('express');
const router = express.Router();
const blogController = require('../controller/blogController');

router.get('/', blogController.getHomePage);
router.get('/write', blogController.getWritePage);
router.post('/write', blogController.writePost);
router.get('/post/:id', blogController.getPost);
router.post('/post/:id/comment', blogController.addComment);

module.exports = router;

const { Router } = require("express");
const router = Router();

const apiPostcontroller = require("./apiPostcontroller");

router.post("/create-blog-post", apiPostcontroller.createBlogPost);
router.get("/blog-posts", apiPostcontroller.getBlogPosts);

module.exports = router;

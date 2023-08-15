const { Router } = require("express");
const router = Router();

const apiPostcontroller = require("./apiPostcontroller");

router.post("/create-post", apiPostcontroller.createPost);
router.get("/posts", apiPostcontroller.getPosts);

module.exports = router;

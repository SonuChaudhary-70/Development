const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.get("/posts", postController.getPosts);

router.post("/addPost", postController.addPost);

router.post("/addComment", postController.addComment);

module.exports = router;

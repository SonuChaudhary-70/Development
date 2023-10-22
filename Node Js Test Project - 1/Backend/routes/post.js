const express = require('express');
const router = express.Router();
const postController = require('../controller/post');

// post routes
router.get('/',postController.getPost);
router.post('/add-post',postController.addPost);

module.exports = router
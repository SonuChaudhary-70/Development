const express = require('express');
const router = express.Router();
const commentController = require('../controller/comment');

// comment routes
router.post('/add-comment',commentController.addComment);
router.get('/:id',commentController.getCommentById);

module.exports = router
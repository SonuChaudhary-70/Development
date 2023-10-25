const Comment = require('../model/comment');
const Post = require('../model/post');

exports.addComment = (req, res) => {
    let commentData = req.body.comment;
    console.log(commentData);
    let postId = req.body.postId
    Post.findByPk(postId)
        .then((post) => {
            Comment.create({
                comment: commentData,
                PostId: post.id
            })
        })
        .then((comment) => {
            console.log('Comment is added successfully');
            res.status(201).json(comment);
        })
        .catch((error) => {
            console.log("Error in adding a new comment", error);
        })
}

exports.getCommentById = (req, res) => {
    Comment.findAll({ where: { PostId: req.params.id } })
        .then((comment) => {
            res.status(201).send(comment)
        })
        .catch(err => {
            console.log('Error while fetching comment :', err);
        })
}

exports
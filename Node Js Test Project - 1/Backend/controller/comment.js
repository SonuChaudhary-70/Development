const Comment = require('../model/comment');

exports.addComment = (req, res, next) => {
    let commentData = req.body.comment;
    console.log('Comment Data:',commentData);
    Comment.create({
        comment: commentData
    })
    .then((comment) => {
        console.log('Comment is added successfully');
    })
    .catch((error) => {
        console.log("Error in adding a new comment", error);
    })
}
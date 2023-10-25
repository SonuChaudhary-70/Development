const Post = require('../model/post');

exports.addPost = (req,res) => {
    let postLink = req.body.link;
    let postDescription = req.body.description;

    Post.create({
        link: postLink,
        description: postDescription
    })
    .then((response) => {
        console.log('Post created successfully');
        res.status(201).json(response)
    })
    .catch((error) => {
        console.log("Error in adding a new post", error);
    })
}

exports.getPost = (req, res) => {
    Post.findAll()
    .then((response) => {
        res.status(201).json(response)
    })
    .catch(err => {
        console.log('Error in getting post data', err);
    })
}
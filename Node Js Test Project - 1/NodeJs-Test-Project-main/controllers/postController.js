const path = require("path");
const { posts, comments } = require("../models/postModel");

// exports.getHomePage = (req, res, next) => {
//   res.sendFile(path.join(__dirname, "../", "public", "views", "index.html"));
// };

exports.addPost = (req, res, next) => {
  console.log(req.body);
  const link = req.body.link;
  const desc = req.body.desc;

  posts
    .create({
      link: link,
      desc: desc,
    })
    .then((result) => {
      console.log("Post Added");
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getPosts = (req, res, next) => {
  posts
    .findAll({ include: comments })
    .then((posts) => {
      res.json(posts);
      // console.log(users);
    })
    .catch((err) => console.log(err));
};

exports.addComment = (req, res, next) => {
  console.log(req.body);
  const comment = req.body.comment;
  const postId = req.body.postId;

  comments
    .create({
      comment: comment,
      postId: postId,
    })
    .then((result) => {
      console.log("Comment Added");
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

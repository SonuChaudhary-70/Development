const express = require('express');
const app = express();
const sequelize = require('./util/db_connection')
const bodyParser = require('body-parser')
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const Post = require('./model/post');
const Comment = require('./model/comment');
const cors = require('cors')

app.use(cors());
app.use(bodyParser.json());

// app.use((req, res, next) => {
//     Post.findAll()
//     .then(post =>{
//         req.post = post
//         next()
//     })
//     .catch(err =>{
//         console.log('Error while fetching post: ' + err.message);
//     })
// })

app.use('/post', postRoutes)
app.use('/comment', commentRoutes);

// define relationship b/w post and comment
Post.hasMany(Comment,{ as: 'comments' });
Comment.belongsTo(Post,{ constraints: true, onDelete: 'CASCADE' });

sequelize
    // .sync({force:true})
    .sync()
    .then((result) => {
        app.listen(7048);
    })
    .catch((err) => console.log(err));

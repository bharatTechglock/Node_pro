// models/index.js
import User from '../models/User.js';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';
import Like from '../models/Like.js';

// Define the association function
const userPosts = (models) => {
    const {
        User
    } = models;
    Post.belongsTo(User);
};

const postComments = (models) => {
    Post.hasMany(models.Comment, {
        foreignKey: 'postId',
        as: 'postComments',
    });
};
const postLikes = (models) => {
    Post.hasMany(models.Like, {
        foreignKey: 'postId',
        as: 'postLikes',
    });
};

// Export all models
userPosts({ Post, User });
postComments({ Post, Comment });
postLikes({Post,Like});
export { User, Post, Comment,Like };

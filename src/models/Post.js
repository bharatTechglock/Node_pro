// models/post.js
import {
    DataTypes
} from 'sequelize';
import sequelize from '../../config/db.js';
import {
    User
} from './User.js';
import
{Comment}
from './Comment.js';
import {Like} from './Like.js';
const Post = sequelize.define('Post', {
    // Define Post attributes
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

// const postUsers = (models) => {
//     const {
//         User
//     } = models;
//     Post.belongsTo(User);
// };
// const postComments = (models) => {
//     const { Comment } = models;
//     Post.hasMany(Comment, { as: 'commentPosts' });
// };

// const postLikes = (models) => {
//     const { Like } = models;
//     Post.hasMany(Like,{as: 'likePosts'});
// };

// Post.hasMany(Comment, { as: 'commentPosts' });
// Post.hasMany(Like);

// export {
//     Post,
//     postUsers
// };
const postUsers = (models) => {
    const {
        User
    } = models;
    Post.belongsTo(User);
};

const postComments = (models) => {
    const {
        Comment
    } = models;
    Post.hasMany(Comment, {
        as: 'commentPosts'
    });
};

const postLikes = (models) => {
    const {
        Like
    } = models;
    Post.hasMany(Like);
};

export {
    Post,
    postUsers,
    postComments,
    postLikes
};
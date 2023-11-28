// models/comment.js
import {
    DataTypes
} from 'sequelize';
import sequelize from '../../config/db.js';
import {Post} from './Post.js';

const Comment = sequelize.define('Comment', {
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});
const commentPosts = (models) => {
    const { Post } = models;
    Comment.belongsTo(Post, { as: 'commentPosts' });
};

export {
    Comment,
    commentPosts
};

// export default (models) => {
//     const { Post } = models;
//     Comment.belongsTo(Post, { as: 'commentPosts' });

//     return Comment;
// };

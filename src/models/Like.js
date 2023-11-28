// models/like.js
import {
    DataTypes
} from 'sequelize';
import sequelize from '../../config/db.js'; // Make sure to import your sequelize instance
// import {User} from '../models/User.js';
// import {Post} from '../models/Post.js';
// import {Post,User} from '../models/index.js';

const Like = sequelize.define('Like', {
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

const likePosts = (models) => {
    const {
        Post
    } = models;
    Like.belongsTo(Post);
};
const userLikes = (models) => {
    const {
        User
    } = models;
    Like.belongsTo(User);
};

export {
    Like,
    likePosts,
    userLikes
};

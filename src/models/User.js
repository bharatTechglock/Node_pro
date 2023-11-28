// models/User.js
import {
    DataTypes
} from 'sequelize';
import sequelize from '../../config/db.js';
import {Post} from './Post.js';
import {Like} from './Like.js';

const User = sequelize.define('User', {
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: true,
    },
});

// User.hasMany(Post);
// User.hasMany(Like);

// // Bidirectional associations
// Post.belongsTo(User);
// Like.belongsTo(User);
// const userPosts = (models) => {
//     const {
//         Post
//     } = models;
//     User.hasMany(Post);
// };
// const userLikes = (models) => {
//     const {
//         Like
//     } = models;
//     User.hasMany(Like);
// };
// User.hasMany(Post);
// User.hasMany(Like);
// export {
//     User
// };
// Ensure the correct association functions are used
const userPosts = (models) => {
    const { Post, Like } = models;

    User.hasMany(Post);
    User.hasMany(Like);

    // Bidirectional associations
    Post.belongsTo(User);
    Like.belongsTo(User);
};

export { User, userPosts };
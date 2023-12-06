// models/index.js
import User from '../models/User.js';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';
import Like from '../models/Like.js';
import Role from './Role.js';
import Permission from './Permission.js';
import Role_has_permission from './Role_has_permission.js';
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
// const roleHasPermissions = (models) => {
//     Role.hasMany(models.Role_has_permission, {
//         foreignKey: 'role_id',
//         as: 'roleHasPermissions'
//     })
// }
Role.associate = (models) => {
    Role.belongsToMany(models.Permission, {
        through: 'RolePermission'
    });
};
Permission.associate = (models) => {
    Permission.belongsToMany(models.Role, {
        through: 'RolePermission'
    });
};
Role.belongsToMany(Permission, { through: Role_has_permission });
Permission.belongsToMany(Role, { through: Role_has_permission });

// Export all models
userPosts({
    Post,
    User
});
postComments({
    Post,
    Comment
});
postLikes({
    Post,
    Like
});
// roleHasPermissions({
//     Role,
//     Role_has_permission
// });
export {
    User,
    Post,
    Comment,
    Like,
    Role,
    Permission,
    Role_has_permission
};
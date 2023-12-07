// models/index.js
import User from '../models/User.js';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';
import Like from '../models/Like.js';
import Role from './Role.js';
import Permission from './Permission.js';
import Role_has_permission from './Role_has_permission.js';

// Define the association function
// const userPosts = (models) => {
//     const {
//         User
//     } = models;
//     Post.belongsTo(User);
// };
const userPosts = (models) => {
    const {
        User,
        Post
    } = models;
    Post.belongsTo(User);
};
// const postComments = (models) => {
//     Post.hasMany(models.Comment, {
//         foreignKey: 'postId',
//         as: 'postComments',
//     });
// };
const postComments = (models) => {
    const {
        Post,
        Comment
    } = models;
    Post.hasMany(Comment, {
        foreignKey: 'postId',
        as: 'postComments',
    });
};
// const postLikes = (models) => {
//     Post.hasMany(models.Like, {
//         foreignKey: 'postId',
//         as: 'postLikes',
//     });
// };
const postLikes = (models) => {
    const {
        Post,
        Like
    } = models;
    Post.hasMany(Like, {
        foreignKey: 'postId',
        as: 'postLikes',
    });
};
const rolePermissions = (models) => {
    const {
        Role,
        Permission,
        Role_has_permission
    } = models;

    Role.belongsToMany(Permission, {
        through: Role_has_permission,
        foreignKey: 'role_id',
        otherKey: 'permission_id',
        as: 'permissions',
    });

    Permission.belongsToMany(Role, {
        through: Role_has_permission,
        foreignKey: 'permission_id',
        otherKey: 'role_id',
        as: 'roles',
    });
};

// Export all models
// Extend the User model with the hasPermission method
User.prototype.hasPermission = async function(permissionName) {
    // Check if the user has a role that has the specified permission
    const roles = await Role.findAll({ include: 'permissions' });
//   console.log(permissionName); return false;
    for (const role of roles) {
      const permissions = role.permissions.map(permission => permission.name);
    //   console.log(permissions); return false;
      if (permissions.includes(permissionName)) {
        return true;
      }
    }
  
    return false;
  };
// Export all models and associations
userPosts({
    User,
    Post
});
postComments({
    Post,
    Comment
});
postLikes({
    Post,
    Like
});
rolePermissions({
    Role,
    Permission,
    Role_has_permission
});
// userPosts({
//     Post,
//     User
// });
// postComments({
//     Post,
//     Comment
// });
// postLikes({
//     Post,
//     Like
// });
// roleHasPermissions({
//     Role,
//     Role_has_permission
// });
// export {
//     User,
//     Post,
//     Comment,
//     Like,
//     Role,
//     Permission,
//     Role_has_permission
// };
export {
    User,
    Post,
    Comment,
    Like,
    Role,
    Permission,
    Role_has_permission
};
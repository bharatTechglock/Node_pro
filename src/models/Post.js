// models/post.js
import {
    DataTypes
} from 'sequelize';
import {sequelize} from '../../config/db.js';

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
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

// export {
//     Post
// };
export default Post;
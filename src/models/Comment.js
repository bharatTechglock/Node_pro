// models/comment.js
import {
    DataTypes
} from 'sequelize';
import sequelize from '../../config/db.js';

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

// export {
//     Comment
// };
export default Comment;
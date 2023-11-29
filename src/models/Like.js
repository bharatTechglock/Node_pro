// models/like.js
import {
    DataTypes
} from 'sequelize';
import {sequelize} from '../../config/db.js';

const Like = sequelize.define('Like', {
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    liked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
});
// export {
//     Like
// };
// Like.sync({ alter: true })
export default Like;
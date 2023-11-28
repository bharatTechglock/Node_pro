// models/like.js
import {
    DataTypes
} from 'sequelize';
import sequelize from '../../config/db.js';

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
// export {
//     Like
// };
export default Like;

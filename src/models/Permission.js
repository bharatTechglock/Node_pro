// models/Permission.js
import {
    DataTypes
} from 'sequelize';
import {sequelize} from '../../config/db.js';

const Permission = sequelize.define('Permission', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    guard_name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

// export {
//     Permission
// };
// Permission.sync({ force: true });
export default Permission;
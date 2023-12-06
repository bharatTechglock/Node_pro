// models/Role_has_permission.js
import {
    DataTypes
} from 'sequelize';
import {sequelize} from '../../config/db.js';

const Role_has_permission = sequelize.define('Role_has_permission', {
    permission_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

// export {
//     Role_has_permission
// };
// Role_has_permission.sync({ force: true });
export default Role_has_permission;
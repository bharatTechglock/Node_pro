// models/Role_has_permission.js
import {
    DataTypes
} from 'sequelize';
import {
    sequelize
} from '../../config/db.js';

// Role_has_permission model definition
const Role_has_permission = sequelize.define('Role_has_permission', {
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    permission_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // user_id: {
    //   type: DataTypes.INTEGER,
    //   defaultValue: 1,
    //   allowNull: true, 
    // },
    // other fields...
  });
  

// export {
//     Role_has_permission
// };
// Role_has_permission.sync({ force: true });
export default Role_has_permission;
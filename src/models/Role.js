import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/db.js';

const Role = sequelize.define('Role', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  guard_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});
// await Role.sync({ force: true });
export default Role;

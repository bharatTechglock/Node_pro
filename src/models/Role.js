// models/Role.js
import {
    DataTypes
} from 'sequelize';
import {sequelize} from '../../config/db.js';

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


// export {
//     Role
// };
// await Role.sync({ force: true });
// Role.sync({
//     force: true
// }).then(() => {
//     console.log('Database synced');
// });
export default Role;
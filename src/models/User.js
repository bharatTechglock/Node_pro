// models/User.js
import {
    DataTypes
} from 'sequelize';
import {
    sequelize
} from '../../config/db.js';

const User = sequelize.define('User', {
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    user_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 2,
        // unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});


// export { User };
// User.sync({ alter: true })
export default User;
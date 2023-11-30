// db.js
import {
    Sequelize
} from "sequelize";
// import dbCreate from "./dbCreate.js";

// const sequelize = new Sequelize(config.development);

const sequelize = new Sequelize('Node_Pro_Test', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

// sequelize.sync({
//     force: false
// }).then(() => {
//     console.log('Database synced');
// });

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

// Close the connection when the Node.js process exits
process.on('exit', () => {
    console.log('Closing database connection.');
    sequelize.close();
});

export {
    sequelize,
    testConnection
};
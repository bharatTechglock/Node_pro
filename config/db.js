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


// Establish the connection only once
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

// console.log(testConnection());
export {
    sequelize,
    testConnection
};
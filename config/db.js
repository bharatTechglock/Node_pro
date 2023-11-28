// db.js
import {
    Sequelize
} from "sequelize";
import config from './config.js';
// import dbCreate from "./dbCreate.js";

const sequelize = new Sequelize(config.development);

// const sequelize = new Sequelize('Node_Pro_Test', 'root', '', {
//     host: 'localhost',
//     dialect: 'mysql',
// });
sequelize.sync().then(() => {
    console.log('Database synchronized.');
    // ... start the server or perform other actions
});

// Test the connection
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    // sequelize.sync({
    //     force: true
    // });

} catch (error) {
    console.error('Unable to connect to the database:', error.message);
}

export default sequelize;
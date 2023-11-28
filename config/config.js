import dotenv from 'dotenv';

dotenv.config();

export default {
    development: {
        username: 'root',
        password: null,
        database: 'Node_Pro_Test',
        host: '127.0.0.1',
        dialect: 'mysql',
    },
};

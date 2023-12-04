'use_strict'
import dotenv from 'dotenv';
dotenv.config();
const secretKey = process.env.SECRET_KEY;
import jwt from 'jsonwebtoken';
import {redisClient,field} from '../utils/redisConnection.js';


/**
 * @Description Genarate token for auth
 * @date 06/11/2023 - 16:35:44
 * Token expiration time (e.g., 30 minutes)
 * @param {*} user
 * @returns {*}
 */

const utilHelper = {
    generateAuthToken: (user) => {
        const payload = {
            id: user.id,
            email: user.email,
            role: user.user_type,
            name: user.name,
        };
        const secret_key = 'bharat-kumar';
        const options = {
            expiresIn: '4hour',
        };
        // Generate a new token
        const newToken = jwt.sign(payload, secret_key, options);
        return newToken;
    },
    // Function to store a user's session token in Redis upon login
    storeTokenInRedis: async (userId, token) => {
        const key = `user:${userId}:token`;
        // Use HSET to store the token in a hash field
        try {
            await redisClient.hSet(field, key, token);
        } catch (error) {
            console.log(error);
        }
    },

    // Function to remove a user's session token from Redis upon logout
    removeTokenFromRedis: async (userId) => {
        const key = `user:${userId}:token`;
        try {
            await redisClient.hDel(field, key);
        } catch (error) {
            console.log(error);
        }
    }
}

export {
    utilHelper
}
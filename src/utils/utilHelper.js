'use_strict'
import dotenv from 'dotenv';
dotenv.config();
const secretKey = process.env.SECRET_KEY;
import jwt from 'jsonwebtoken';

/**
 * @Description Genarate token for auth
 * @date 06/11/2023 - 16:35:44
 * Token expiration time (e.g., 2 hour)
 * @param {*} user
 * @returns {*}
 */
// const generateAuthToken = (user) => {
//     const payload = {
//         id: user.id,
//         email: user.email,
//         role: user.user_type,
//         name: user.name,
//     };
//     const secret_key = secretKey;
//     const options = {
//         expiresIn: '10h',
//     };
//     return jwt.sign(payload, secret_key, options);
// }
const tokenBlacklist = [];

const generateAuthToken = (user) => {
    const payload = {
        id: user.id,
        email: user.email,
        role: user.user_type,
        name: user.name,
    };
    const secret_key = 'bharat-kumar'; // Make sure to replace with your actual secret key
    const options = {
        expiresIn: '30m',
    };

    // Check if the user has an existing token in the blacklist
    const index = tokenBlacklist.findIndex((blacklistedToken) => blacklistedToken === user.id);
    if (index !== -1) {
        // Token found in the blacklist, remove it
        tokenBlacklist.splice(index, 1);
    }
    // Generate a new token
    const newToken = jwt.sign(payload, secret_key, options);
    // Store the user's ID in the blacklist
    tokenBlacklist.push(user.id);

    return newToken;
}



export {
    generateAuthToken
}
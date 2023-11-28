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
const generateAuthToken = (user) => {
    const payload = {
        id: user.id,
        email: user.email,
        role: user.user_type,
        name: user.name,
    };
    const secret_key = secretKey;
    const options = {
        expiresIn: '10h',
    };
    return jwt.sign(payload, secret_key, options);
}



export  {generateAuthToken}
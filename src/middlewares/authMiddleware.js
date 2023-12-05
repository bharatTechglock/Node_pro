import jwt from 'jsonwebtoken';
import {redisClient,field} from '../utils/redisConnection.js';

/**
 * @DESC Verify JWT from authorization header Middleware
 */
const userAuth = async(req, res, next) => {
    try {
        if (req.headers && req.headers["authorization"]) {
            const token = req.headers["authorization"].split(' ')[1];
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            const key = `user:${decoded.id}:token`;
            // Assuming you have a redisClient with a properly defined hGet method
            const storedToken = await redisClient.hGet(field, key);
            // console.log(storedToken); return false;
            if (storedToken && storedToken === token) {
                return res.status(401).json({
                    message: 'Unauthorized - User logged out, Please login again!'
                });
            }
            // You can attach the decoded user information to the request object for later use
            req.user = decoded;
            // Proceed to the next middleware or route handler
            return next();
        } else {
            return res.status(401).json({
                message: 'Unauthorized - Token not provided'
            });
        }
    } catch (error) {
        // console.error('Authentication error:', error);
        return res.status(500).json({
            success: false,
            error:error,
            message: error.message
        });
    }
};
export default userAuth;
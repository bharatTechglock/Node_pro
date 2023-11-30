import jwt from 'jsonwebtoken';
const blacklist = new Set();
import User from '../models/User.js';

/**
 * @DESC Verify JWT from authorization header Middleware
 */
const userAuth = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(403).json({
            success: false,
            message: 'Do not have permission for this!, Please add token in header.'
        });
    }
    const token = authHeader.split(" ")[1];
    const findUser = User.findOne({
        where: {
            refresh_tokens: token
        }
    })
    // const hasUser = !!findUser; // convert true or false
    console.log(findUser.refresh_tokens);
    if(findUser.refresh_tokens === null){
        return res.status(403).json({
            success: false,
            message: 'Currently you logout. Please login and use token.'
        });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                success: false,
                error: err,
                message: err.message
            });
        }
        next();
    });
};
export default userAuth;
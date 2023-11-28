import {User} from '../models/User.js';
import jwt from 'jsonwebtoken';
const blacklist = new Set();

/**
 * @DESC Verify JWT from authorization header Middleware
 */
const userAuth = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(403).json({
            success: false,
            message: 'Do not have permission for this!'
        });
    }
    //  return res.sendStatus(403);
    // Bearer token
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        // Add token to blacklist
        blacklist.add(token);
        if (err) {
            return res.status(403).json({
                success: false,
                error: err,
                message: err.message
            });
        }
        //for correct token
        next();
    });
};


// module.exports = {
//     userAuth
// }
export default userAuth;
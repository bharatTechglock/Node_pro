import { User } from "../models/index.js";
import { authenticateUser } from "../utils/logingUser.js";

// Middleware to check admin permission
const checkAdminPermission = async (req, res, next) => {
    const adminRoleId = 1; 
    try {
        // Assuming you have a function to find a user by ID
        const userDetails = authenticateUser(req);

        const user = await User.findByPk(userDetails.id)
        // Assuming you have a method to check if a user has a specific permission
        const hasPermission = await user.hasPermission('READ');
        // console.log(hasPermission); return false;
        // console.log(user); return false;


        if (hasPermission) {
            // User has the required permission
            next();
        } else {
            res.status(403).json({
                error: 'Unauthorized'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};

export {
    checkAdminPermission
}
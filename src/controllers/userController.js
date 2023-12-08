// import User from '../models/User.js';
import {
    User
} from '../models/index.js'
import bcrypt from 'bcrypt';
import {
    utilHelper
} from '../utils/utilHelper.js';
import {
    authenticateUser
} from '../utils/logingUser.js';
import {
    validationResult
} from 'express-validator';
import {
    logoutHandler
} from '../middlewares/newmiddl.js';
import {
    addToBlacklist
} from '../utils/jwtBlacklist.js'
import {
    checkPermission
} from '../services/checkPermission.js';
import { RoleConstant,PermissionConstant } from '../utils/constants.js';


const userController = {
    /**
     * @description Create New User
     * @type POST
     * @path /api/users/
     * @param {*} req
     * @param {*} res
     * @returns JSON
     */
    registerUser: async (req, res) => {
        try {
            // console.log(req.body); return false;
            const {
                first_name,
                last_name,
                email,
                password
            } = req.body;
            //validation

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array()
                });
            }

            // Check if the email already exists in the database
            const existingUser = await User.findOne({
                where: {
                    email
                }
            });
            // console.log(existingUser); return false;

            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    error: 'Email already exists'
                });
            }
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt)
            // console.log(req.body); return false;
            const newUser = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: hashPassword
            };
            let data = await User.create(newUser);
            if (data) {
                data.created_by = data.id;
                await data.save();
            }
            return res.status(201).json({
                success: true,
                data: data,
                message: 'User registered!.'
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error,
                message: error.message
            });
        }
    },

    /**
     * @description Login user
     * @param {*} req email,password
     * @param {*} res generate auth and login user
     * @returns 
     */
    userLogin: async (req, res) => {
        try {
            const email = req.body.email;
            const password = req.body.password;
            if (!email || !password) {
                return res.status(400).json({
                    error: 'Email and password are required!'
                });
            }
            const findUser = await User.findOne({
                where: {
                    email
                }
            });
            if (findUser) {
                const match = await bcrypt.compare(password, findUser.password);
                if (match) {
                    const authToken = utilHelper.generateAuthToken(findUser);
                    return res.status(200).json({
                        success: true,
                        data: {
                            auth_token: `Bearer ${authToken}`
                        },
                        message: 'Logged in successfully!'
                    });
                } else {
                    return res.status(401).json({
                        error: 'Incorrect password'
                    });
                }
            } else {
                return res.status(404).json({
                    error: 'Email or user does not exist!'
                });
            }
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error,
                message: 'Internal server error'
            });
        }
    },
    /**
     * User logout method
     * @param {*} req 
     * @param {*} res 
     */
    logout: async (req, res) => {
        try {
            const user = authenticateUser(req);
            if (user) {
                // Store the token in Redis
                const token = req.headers["authorization"].split(' ')[1];
                await utilHelper.storeTokenInRedis(user.id, token);
                // await utilHelper.removeTokenFromRedis(user.id);
                return res.status(200).json({
                    success: true,
                    message: 'Logged out successfully!'
                });
            }
        } catch (error) {
            console.log(error);
            return res.status(401).json({
                error: error,
                message: 'Logout failed'
            });
        }
    },
    logouut: async (req, res) => {

        try {
            const user = authenticateUser(req);
            const logouTu = logoutHandler(req);
            return res.status(200).json({
                success: true,
                message: 'Logged out successfully!'
            });
        } catch (error) {
            console.log(error);
            return res.status(401).json({
                error: error,
                message: error.message
            });
        }
    },
    logouut2: async (req, res) => {

        try {
            const user = authenticateUser(req);
            // const logouTu = logoutHandler(req);
            const token = req.headers["authorization"].split(' ')[1];
            const jwtBlacklist = addToBlacklist(token);
            return res.status(200).json({
                success: true,
                message: 'Logged out successfully!'
            });
        } catch (error) {
            console.log(error);
            return res.status(401).json({
                error: error,
                message: 'Logout failed'
            });
        }
    },
    userDetails: async (req, res) => {
        try {
            const authUser = authenticateUser(req);
           //Check Read permission
            const hasPermission = await checkPermission(RoleConstant.CONTRACTOR,PermissionConstant.READ);
            if (!hasPermission) {
                throw new Error('Unauthorized: User does not have permission to fetch user details');
            }
            const user_id = req.body.userId;
            const user = await User.findByPk(user_id);
            return res.status(200).json({
                success: true,
                data: user,
                message: 'User details get successfully!'
            });
        } catch (error) {
            console.log(error);
            return res.status(401).json({
                error: error,
                message: error.message
            });
        }
    }

};

export default userController;
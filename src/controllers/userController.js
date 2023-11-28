import express from 'express';
import {User} from '../models/User.js';
import bcrypt from 'bcrypt';
import {
    generateAuthToken
} from '../utils/utilHelper.js';
import {
    validationResult
} from 'express-validator';
import {
    logingUser
} from '../utils/logingUser.js';

/**
 * @description Create New User
 * @type POST
 * @path /api/users/
 * @param {*} req
 * @param {*} res
 * @returns JSON
 */
const registerUser = async (req, res) => {
    try {
        // console.log(req.body); return false;
        const {
            first_name,
            last_name,
            email,
            password
        } = req.body;
        //validation
        // console.log(email); return false;

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
}

/**
 * @description Login user
 * @param {*} req email,password
 * @param {*} res generate auth and login user
 * @returns 
 */
const userLogin = async (req, res) => {
    try {
        // Find the user by ID
        let email = req.body.email;
        let password = req.body.password;
        // Check if req.body is null or empty
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
        // console.log(findUser); return false;
        if (findUser) {
            const match = await bcrypt.compare(password, findUser.password);
            if (match) {
                // Generate an authentication token

                // const authToken = util.generateAuthToken(findUser);
                const authToken = generateAuthToken(findUser);

                return res.status(201).json({
                    success: true,
                    data: {
                        auth_token: `Bearer_ ${authToken}`
                    },
                    message: 'Logged in successfully!'
                })
            } else {
                res.status(401).send('Incorrect password');
            }
        } else {
            return res.status(400).json({
                error: 'Email or user is not exists!'
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export {
    registerUser,
    userLogin
}
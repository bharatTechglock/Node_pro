import userController from "../controllers/userController.js";
import express from "express";
import userAuth from '../middlewares/authMiddleware.js';
import {createUser,loginUser} from "../utils/validation.js";

const router = express.Router();

// router.post('/user', createUser);
router.post('/', createUser,userController.registerUser);

router.post('/login-user',loginUser,userController.userLogin);
router.post('/user-logout',userAuth,userController.logout);


export default router;
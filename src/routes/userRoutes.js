import userController from "../controllers/userController.js";
import express from "express";
import userAuth from '../middlewares/authMiddleware.js';
import {createUser,loginUser} from "../utils/validation.js";
import { checkTokenBlacklist } from '../middlewares/newmiddl.js';
import {checkJwtBlacklist} from '../middlewares/jwtBlacklistMiddleware.js'

const router = express.Router();

// router.post('/user', createUser);
router.post('/', createUser,userController.registerUser);

router.post('/login-user',loginUser,userController.userLogin);
router.post('/user-logout',userAuth,userController.logout);
// router.post('/logout',checkTokenBlacklist,userController.logouut);
router.post('/logout',checkJwtBlacklist,userController.logouut);


export default router;
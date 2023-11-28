import { registerUser,userLogin } from "../controllers/userController.js";
import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {createUser} from "../utils/validation.js";

const router = express.Router();

// router.post('/user', createUser);
router.post('/', registerUser);

router.post('/login-user', userLogin);


export default router;
import userController from "../controllers/userController.js";
import express from "express";
import userAuth from '../middlewares/authMiddleware.js';
import {createUser,loginUser} from "../utils/validation.js";
import { checkTokenBlacklist } from '../middlewares/newmiddl.js';
import {checkJwtBlacklist} from '../middlewares/jwtBlacklistMiddleware.js'
import { permissionController } from "../controllers/permissionController.js";
import { checkAdminPermission } from "../middlewares/checkUserPermission.js";

const router = express.Router();

// router.post('/user', createUser);
router.post('/', createUser,userController.registerUser);

router.post('/login-user',loginUser,userController.userLogin);
router.post('/user-logout',userAuth,userController.logout);
// router.post('/logout',checkTokenBlacklist,userController.logouut);
router.post('/logout',checkJwtBlacklist,userController.logouut);
router.get('/user-profile',userAuth,checkAdminPermission,userController.userDetails);
router.post('/invoke-permission',userAuth,permissionController.invokePermissionRoute);
router.post('/revoke-permission',userAuth,permissionController.revokePermissionRoute);


export default router;
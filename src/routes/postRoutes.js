import express from 'express';
import postController from '../controllers/postController.js';
import {
    createComment,
    createLike,
    createPostValidation,
    getLike
} from '../utils/validation.js';
import userAuth from '../middlewares/authMiddleware.js';

const router = express.Router();

// This is where the issue might be occurring
router.get('/',userAuth,postController.getAllPosts);
router.post('/',userAuth,createPostValidation, postController.createPost);
router.post('/comment',userAuth,createComment, postController.commentOnPost);
router.post('/like',userAuth,createLike, postController.likeOnPost);
router.get('/getLike',userAuth,postController.getLikesOnPost);
router.get('/getAllLikes',userAuth, postController.getAllLikesOnPost);
router.get('/getUserPostLikeOrNot',userAuth,postController.likeOnPostCheck);
router.get('/getPostWithComments',getLike,userAuth,postController.getPostWithComments);
router.get('/authUserPostLike',getLike,userAuth,postController.authUserPostLike);

export default router;
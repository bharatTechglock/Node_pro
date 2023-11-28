import express from 'express';
import {
    getAllPosts,
    createPost,
    commentOnPost,
    likeOnPost,
    getLikesOnPost,
    getAllLikesOnPost,
    totalPostComments,
    likeOnPostCheck
} from '../controllers/postController.js';
import {
    createComment,
    createLike,
    createPostValidation,
    getLike
} from '../utils/validation.js';
import userAuth from '../middlewares/authMiddleware.js';

const router = express.Router();

// This is where the issue might be occurring
router.get('/',userAuth,getAllPosts);
router.post('/',userAuth,createPostValidation, createPost);
router.post('/comment',userAuth,createComment, commentOnPost);
router.post('/like',userAuth,createLike, likeOnPost);
router.get('/getLike',userAuth,getLikesOnPost);
router.get('/getAllLikes',userAuth, getAllLikesOnPost);
router.get('/getUserPostLikeOrNot',userAuth,likeOnPostCheck);
router.get('/get_total_comment_this_postId',getLike,userAuth,totalPostComments);

export default router;
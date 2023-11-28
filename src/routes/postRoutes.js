// import express from 'express';
// import { getAllPosts, createPost, commentOnPost, likeOnPost, getLikesOnPost, getAllLikesOnPost } from '../controllers/postController.js';
// import { createComment, createLike, createPostValidation } from '../utils/validation.js';
// import authMiddleware from '../middlewares/authMiddleware.js';

// const router = express.Router();

// router.get('/', authMiddleware.userAuth, getAllPosts);
// router.post('/', authMiddleware.userAuth, createPost, createPost);
// router.post('/comment', authMiddleware.userAuth, createComment, commentOnPost);
// router.post('/like', authMiddleware.userAuth, createLike, likeOnPost);
// router.get('/getLike', authMiddleware.userAuth, getLikesOnPost);
// router.get('/getAllLikes', authMiddleware.userAuth, getAllLikesOnPost);

// export default router;
// postRoutes.js

import express from 'express';
import {
    getAllPosts,
    createPost,
    commentOnPost,
    likeOnPost,
    getLikesOnPost,
    getAllLikesOnPost
} from '../controllers/postController.js';
import {
    createComment,
    createLike,
    createPostValidation
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

export default router;
import { validationResult } from 'express-validator';
import { logingUser } from '../utils/logingUser.js';
import {Post,postComments} from '../models/Post.js';
import {Comment} from '../models/Comment.js';
import {Like} from '../models/Like.js';

/**
 * @description Get All Posts with likes and comments for login user
 * @type GET
 * @path /api/posts
 * @param {*} req
 * @param {*} res
 * @returns JSON
 */
const getAllPosts = async (req, res) => {
    try {
        const authUser = logingUser(req);
        // console.log(authUser); return false;
        let allPosts = await Post.findAll({
            where: {
                userId: authUser.id
            },
            include: [
                {
                    model: Comment,
                    as: 'commentPosts',
                },
                {
                    model: Like,
                    as: 'likePosts',
                },
            ],
        });
        // console.log(allPosts); return false; 

        return res.status(200).json({
            success: true,
            count: allPosts.length,
            data: allPosts,
            message: "Get all posts for this user successfully.!"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error,
            message: error.message
        });
    }
}

/**
 * @description Create New Post
 * @type POST
 * @path /api/posts/
 * @param {*} req
 * @param {*} res
 * @returns JSON
 */
const createPost = async (req, res, next) => {
    try {
        const authUser = logingUser(req);
        // console.log(authUser); return false;
        //validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        // console.log(req.body); return false;
        const newPost = {
            title: req.body.title,
            content: req.body.content,
            userId: authUser.id
        };
        let data = await Post.create(newPost);
        return res.status(201).json({
            success: true,
            data: data,
            message: 'New post created!'
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
 * @description Comment on Post
 * @type POST
 * @path /api/posts/
 * @param {*} req
 * @param {*} res
 * @returns JSON
 */
const commentOnPost = async (req, res, next) => {
    try {
        const authUser = logingUser(req);
        //validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        // console.log(req.body); return false;
        if(req.body.postId){
            const PostExits = await Post.findByPk(req.body.postId);
            if (!PostExits) {
                return res.status(404).json({
                    error: 'Post not found'
                });
            }
        }
        const newComment = {
            content: req.body.content,
            postId: req.body.postId,
            userId: authUser.id
        };
        const data = await Comment.create(newComment);
        return res.status(201).json({
            success: true,
            data: data,
            message: 'New comment created on this post.!'
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
 * @description Like on Post
 * @type POST
 * @path /api/posts/
 * @param {*} req
 * @param {*} res
 * @returns JSON
 */
const likeOnPost = async (req, res, next) => {
    try {
        const authUser =logingUser(req);
        //validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        // console.log(req.body); return false;
        if (req.body.postId) {
            const PostExits = await Post.findByPk(req.body.postId);
            if (!PostExits) {
                return res.status(404).json({
                    error: 'Post not found'
                });
            }
            const createLike = await Like.findOrCreate({
                where: {
                    userId: authUser.id,
                    postId: req.body.postId
                },
                defaults: {
                    userId: authUser.id,
                    postId: req.body.postId
                }
            });
            return res.status(201).json({
                success: true,
                data: createLike,
                message: 'New like on this post.!'
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error,
            message: error.message
        });
    }
}

/**
 * @description Get All Likes On Posts
 * @type GET
 * @path /api/posts
 * @param {*} req
 * @param {*} res
 * @returns JSON
 */
const getLikesOnPost = async (req, res, next) => {
    try {
        const authUser = logingUser(req);
        const postId = req.body.postId;
        // console.log(postId); return false;
        if (!postId) {
            return res.status(400).json({
                error: 'postId is required'
            });
        }

        let likes;
        if (postId) {
            likes = await Like.findAll({
                where: {
                    PostId: postId
                }
            });
        }

        return res.status(200).json({
            success: true,
            totalLikes: likes.length,
            data: likes,
            message: "Get all likes on this post successfully.!"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error,
            message: error.message
        });
    }
}

/**
 * @description Get All Likes On Posts
 * @type GET
 * @path /api/posts
 * @param {*} req
 * @param {*} res
 * @returns JSON
 */
const getAllLikesOnPost = async (req, res, next) => {
    try {
        const authUser = logingUser(req);
        const postId = req.body.postId;
        // console.log(postId); return false;

        if (!postId) {
            return res.status(400).json({
                error: 'postId is required'
            });
        }

        let Posts = await Post.findByPk(postId);
        let likes;
        if (Posts) {
            likes = await Post.findAll({
                where: {
                    id: postId
                },
                include: [{
                    model: Like,
                    as: 'postLikes',
                }],
            });
            return res.status(200).json({
                success: true,
                totalLikes: likes.length,
                data: likes,
                message: "Get all likes on this post successfully.!"
            });
        } else {
            return res.status(400).json({
                error: 'Posts not found on this id!'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error,
            message: error.message
        });
    }
}

export {
    getAllPosts,
    createPost,
    commentOnPost,
    likeOnPost,
    getLikesOnPost,
    getAllLikesOnPost
};
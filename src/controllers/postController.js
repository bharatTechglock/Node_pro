import {
    validationResult
} from 'express-validator';
import {
    authenticateUser
} from '../utils/logingUser.js';
import {
    User,
    Post,
    Comment,
    Like
} from '../models/index.js';
const postController = {
    /**
     * @description Get All Posts with likes and comments for login user
     * @type GET
     * @path /api/posts
     * @param {*} req
     * @param {*} res
     * @returns JSON
     */
    getAllPosts: async (req, res) => {
        try {
            //Get auth user details
            const authUser = authenticateUser(req);
            // Fetch all posts with associated comments and likes
            const allPosts = await Post.findAll({
                where: {
                    userId: authUser.id
                },
                include: [{
                        model: Comment,
                        as: 'postComments',
                    },
                    {
                        model: Like,
                        as: 'postLikes',
                    }
                ],
            });

            return res.status(200).json({
                success: true,
                count: allPosts.length,
                data: allPosts,
                message: 'Get all posts for this user successfully!'
            });
        } catch (error) {
            console.error(error.stack || error.message);
            return res.status(500).json({
                success: false,
                error: error,
                message: error.message
            });
        }
    },

    /**
     * @description Create New Post
     * @type POST
     * @path /api/posts/
     * @param {*} req
     * @param {*} res
     * @returns JSON
     */
    createPost: async (req, res) => {
        try {
            const authUser = authenticateUser(req);
            //validation
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array()
                });
            }
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
    },

    /**
     * @description Comment on Post
     * @type POST
     * @path /api/posts/
     * @param {*} req
     * @param {*} res
     * @returns JSON
     */
    commentOnPost: async (req, res) => {
        try {
            const authUser = authenticateUser(req);
            //validation
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array()
                });
            }
            if (req.body.postId) {
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
    },
    /**
     * @description Like on Post
     * @type POST
     * @path /api/posts/
     * @param {*} req
     * @param {*} res
     * @returns JSON
     */
    likeOnPost: async (req, res) => {
        try {
            const authUser = authenticateUser(req);
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
    },

    /**
     * @description Get All Likes On Posts
     * @type GET
     * @path /api/posts
     * @param {*} req
     * @param {*} res
     * @returns JSON
     */
    getLikesOnPost: async (req, res) => {
        try {
            const authUser = authenticateUser(req);
            const postId = req.body.postId;
            // console.log(postId); return false;
            if (!postId) {
                return res.status(400).json({
                    error: 'postId is required'
                });
            }

            let likes;
            if (postId) {
                const PostExits = await Post.findByPk(req.body.postId);
                if (!PostExits) {
                    return res.status(404).json({
                        error: 'Post not found!'
                    });
                }
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
    },

    /**
     * @description Get All Likes On Posts
     * @type GET
     * @path /api/posts
     * @param {*} req
     * @param {*} res
     * @returns JSON
     */
    getAllLikesOnPost: async (req, res) => {
        try {
            const authUser = authenticateUser(req);
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
    },
    /**
     * Get user like or not this post id
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    likeOnPostCheck: async (req, res) => {
        try {
            const authUser = authenticateUser(req);

            if (req.body.postId) {
                const PostExits = await Post.findByPk(req.body.postId);
                if (!PostExits) {
                    return res.status(404).json({
                        error: 'Post not found'
                    });
                }

                const getUserLike = await Like.count({
                    where: {
                        userId: authUser.id,
                        postId: req.body.postId
                    }
                }).then(count => {
                    return (count > 0) ? true : false
                });
                if (!getUserLike) {
                    return res.status(404).json({
                        success: false,
                        data: getUserLike,
                        message: 'You not like on this post.!'
                    });
                } else {
                    return res.status(201).json({
                        success: true,
                        data: getUserLike,
                        message: 'You already like on this post.!'
                    })
                }

            }
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error,
                message: error.message
            });
        }
    },

    /**
     * Get post with 3 limit comments
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    totalPostComments: async (req, res) => {
        try {
            const authUser = authenticateUser(req);

            // console.log(req.body); return false;
            //validation
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array()
                });
            }
            const {
                postId
            } = req.body;
            if (postId) {
                const PostExits = await Post.findByPk(postId);
                if (!PostExits) {
                    return res.status(404).json({
                        error: 'Post not found'
                    });
                }
            }
            const getCommentOnPosts = await Comment.findAll({
                where: {
                    postId: postId
                },
                order: [
                    ['createdAt', 'DESC']
                ], // Order by creation date in descending order
                limit: 3
            });
            // console.log(getCommentOnPosts); return false;

            if (getCommentOnPosts.length > 0) {
                return res.status(404).json({
                    // error: 'Post not found'
                    success: true,
                    totalPostComments: getCommentOnPosts.length,
                    data: getCommentOnPosts,
                    message: 'fetch comments on this post!'
                });
            } else {
                // console.log(createLike); return false;
                return res.status(201).json({
                    success: false,
                    data: getCommentOnPosts,
                    message: 'No any comments found.!'
                })
            }
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error,
                message: error.message
            });
        }
    },
    /**
     * Get user post like or not 
     * @param {*} req 
     * @param {*} res 
     * @returns true , false
     */
    authUserPostLike: async (req, res) => {
        try {
            const authUser = authenticateUser(req);

            if (!authUser) {
                return res.status(401).json({
                    error: 'Unauthorized'
                });
            }
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array()
                });
            }
            const postId = req.body.postId;

            const like = await Like.findOne({
                where: {
                    userId: authUser.id,
                    postId: postId,
                },
            });

            // const hasLiked = !!like; // Convert to true/false
            // console.log(hasLiked); return false;
            if (like.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'You not like on this post.!'
                });
            }
            return res.status(201).json({
                success: true,
                message: 'You already like on this post.!'
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error,
                message: error.message
            });
        }
    },

};
export default postController;
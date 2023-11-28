
import { check } from 'express-validator';
const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const createUser = [

    check('first_name', 'First name is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    check('email', 'Email length should be 10 to 30 characters')
   .isLength({
        min: 10,
        max: 30
    }),
    check('email', 'Please enter valid email.')
    .isEmail({
        emailRegexp,
    }),
    check('first_name', 'First name length should be 3 to 20 characters')
    .isLength({
        min: 3,
        max: 20
    }),
    check('password', 'Password length should be 8 to 10 characters')
    .isLength({
        min: 8,
        max: 10
    })
]
const createComment = [

    check('content', 'Content is required').not().isEmpty(),
    check('postId', 'Post id is required').not().isEmpty(),
    check('content', 'Content length should be 3 to 2000 characters')
    .isLength({
        min: 3,
        max: 2000
    })
]
const createLike = [
    check('postId', 'Post id is required').not().isEmpty(),
]

const createPostValidation = [
    check('title', 'Post title is required').not().isEmpty(),
    check('content', 'Content is required').not().isEmpty()

]
const getLike = [
    check('postId', 'Post id is required').not().isEmpty(),
]


export  {createUser,createComment,createLike,createPostValidation,getLike}
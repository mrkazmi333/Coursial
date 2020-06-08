const express = require('express');

const router = express.Router();

const usersContoller = require('../controllers/users_controller');
// const postsController = require('../controllers/posts_controller');

router.get('/profile', usersContoller.profile);

// router.get('/posts', postsController.posts);

router.get('/sign-up', usersContoller.signUp);
router.get('/sign-in', usersContoller.signIn);

router.post('/create', usersContoller.create);
module.exports = router;


//this sigin router is just for rendering the basic sigin page..
//i havent created the createSession thing yet
//u need to do that
//but in the lecture video it was working wihtout doing that
//let me see
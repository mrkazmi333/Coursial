const express = require('express');

const router = express.Router();

const passport = require('passport');

const usersContoller = require('../controllers/users_controller');
// const postsController = require('../controllers/posts_controller');

router.get('/profile/:id',passport.checkAuthentication, usersContoller.profile);
router.post('/update/:id',passport.checkAuthentication, usersContoller.update);

// router.get('/posts', postsController.posts);

router.get('/sign-up', usersContoller.signUp);
router.get('/sign-in', usersContoller.signIn);

router.post('/create', usersContoller.create);

//Use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
) , usersContoller.createSession);

router.get('/sign-out', usersContoller.destroySession );

module.exports = router;



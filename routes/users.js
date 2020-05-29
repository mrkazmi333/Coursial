const express = require('express');

const router = express.Router();

const usersContoller = require('../controllers/users_controller');
const postsController = require('../controllers/posts_controller');

router.get('/profile', usersContoller.profile);

router.get('/posts', postsController.posts);
module.exports = router;
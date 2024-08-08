const express = require('express');
const { createPost, addComment } = require('../controllers/postController');
const router = express.Router();

router.post('/create', createPost);
router.post('/comment', addComment);

module.exports = router;

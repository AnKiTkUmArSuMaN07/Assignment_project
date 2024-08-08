const express = require('express');
const { generateFeed } = require('../controllers/feedController');
const router = express.Router();

router.get('/', generateFeed);

module.exports = router;

const express = require('express');
const {
    sendFriendRequest,
    acceptFriendRequest,
    getFriendList
} = require('../controllers/userController');
const router = express.Router();

router.post('/send-friend-request', sendFriendRequest);
router.post('/accept-friend-request', acceptFriendRequest);
router.get('/friends', getFriendList);

module.exports = router;

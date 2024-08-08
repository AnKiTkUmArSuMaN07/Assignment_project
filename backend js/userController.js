const User = require('../models/User');

exports.sendFriendRequest = async (req, res) => {
    const { senderId, receiverId } = req.body;

    try {
        await User.findByIdAndUpdate(senderId, {
            $addToSet: { friend_requests_sent: receiverId }
        });
        await User.findByIdAndUpdate(receiverId, {
            $addToSet: { friend_requests_received: senderId }
        });
        res.json({ msg: 'Friend request sent' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.acceptFriendRequest = async (req, res) => {
    const { senderId, receiverId } = req.body;

    try {
        await User.findByIdAndUpdate(receiverId, {
            $pull: { friend_requests_received: senderId },
            $addToSet: { friends: senderId }
        });
        await User.findByIdAndUpdate(senderId, {
            $pull: { friend_requests_sent: receiverId },
            $addToSet: { friends: receiverId }
        });
        res.json({ msg: 'Friend request accepted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getFriendList = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('friends', ['name', 'profile_picture']);
        res.json(user.friends);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

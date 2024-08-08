const User = require('../models/User');
const Post = require('../models/Post');

exports.generateFeed = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('friends');

        const friendIds = user.friends.map(friend => friend._id);

        // Get posts by friends
        const friendPosts = await Post.find({ author_id: { $in: friendIds } });

        // Get posts commented on by friends
        const commentedPosts = await Post.find({
            "comments.commenter_id": { $in: friendIds },
            author_id: { $nin: friendIds } // Exclude friends' posts already fetched
        });

        // Combine and sort posts by creation date
        const feedPosts = [...friendPosts, ...commentedPosts].sort((a, b) => b.created_at - a.created_at);

        res.json(feedPosts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

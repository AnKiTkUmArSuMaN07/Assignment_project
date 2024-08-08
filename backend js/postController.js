const Post = require('../models/Post');

exports.createPost = async (req, res) => {
    const { authorId, content } = req.body;

    try {
        const post = new Post({
            author_id: authorId,
            content
        });
        await post.save();
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.addComment = async (req, res) => {
    const { postId, commenterId, content } = req.body;

    try {
        const post = await Post.findById(postId);
        post.comments.push({ commenter_id: commenterId, content });
        await post.save();
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

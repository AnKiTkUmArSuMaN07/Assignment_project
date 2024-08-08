const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    name: String,
    profile_picture: String,
    bio: String,
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    friend_requests_sent: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    friend_requests_received: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);

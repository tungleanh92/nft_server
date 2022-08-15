const mongoose = require('mongoose');

const User = new mongoose.Schema({
    _id: {
        type: String,
    },
    name: {
        type: String,
    },
    url: {
        type: String,
    },
    email: {
        type: String,
    },
    bio: {
        type: String,
    },
    facebook: {
        type: String,
    },
    twitter: {
        type: String,
    },
    instagram: {
        type: String,
    },
    avatar: {
        data: Buffer,
        name: String
    },
    banner: {
        data: Buffer,
        name: String
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('user', User);
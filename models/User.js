const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    terms: {
        type: Boolean,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
})

module.exports = User = mongoose.model('users', UserSchema);
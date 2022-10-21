const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        requried: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    blogs: [{ type: mongoose.Types.ObjectId, ref: "Blog", required: true }],
});



const User = mongoose.model('User', UserSchema);
module.exports = User;


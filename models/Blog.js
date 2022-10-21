const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    title: {
        type: String,
        requried: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    datePosted: {
        type: Date,
        default: new Date()
    }
});


const Blog = mongoose.model('Blog', BlogSchema);
module.exports = Blog;


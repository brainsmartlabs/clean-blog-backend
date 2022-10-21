const mongoose= require('mongoose');
const Blog = require('../models/Blog.js');
const User = require('../models/User.js');

module.exports.getAllBlogs = async (req, res, next) => {
    let blogs;
    try {
        blogs = await Blog.find().populate('user');
    } catch (err) {
        console.log(err);
    }
    if (!blogs) {
        return res.status(404).json({ message: "Blogs Collection Not Found" })
    }
    return res.status(200).json({ blogs });
}

module.exports.addBlog = async (req, res, next) => {

   
    const { title, description, image, user } = req.body;
  

    let exisitingUser;
    try {
        exisitingUser = await User.findById(user);
    } catch (err) {
        console.log(err);
    }

    if (!exisitingUser) {
        return res.status(400).json({ message: `Unable to find user by this id: ${user}` });
    }

    const blog = new Blog({
        title,
        description,
        image,
        user: exisitingUser._id,
    });

    try {
        const session = await mongoose.startSession();
        session.startTransaction({ session });
        await blog.save({ session });
        exisitingUser.blogs.push(blog);
        await exisitingUser.save({ session });
        await session.commitTransaction();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: `This transaction has failed due to: ${err}` });
    }
    return res.status(200).json({ blog });
}

module.exports.updateBlog = async (req, res, next) => {
    const { title, description } = req.body;
    const blogID = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndUpdate(blogID, {
            "title": title,
            "description": description,
        });
    } catch (err) {
        return console.log(err);
    }

    if (!blog) {
        return res.status(500).json({ message: "Unable to update the Blog" });
    }

    return res.status(200).json({ blog });
}

module.exports.getBlogByID = async (req, res, next) => {
    const blogID = req.params.id;
    let blog;
    try {
        blog = await Blog.findById(blogID).populate('user');
    } catch (err) {
        return console.log(err);
    }

    if (!blog) {
        return res.status(404).json({ message: "No Blog of this ID Found" });
    }

    return res.status(200).json({ blog });
}

module.exports.deleteByID = async (req, res, next) => {
    const blogID = req.params.id;
    let blog;
    try {
        const session = await mongoose.startSession();
        session.startTransaction({ session });
        blog = await Blog.findByIdAndRemove(blogID, { session }).populate('user');
        await blog.user.blogs.pull(blog);
        await blog.user.save({ session });
        await session.commitTransaction();
    } catch (err) {
        return console.log(err);
    }
    if (!blog) {
        return res.status(500).json({ message: "Cannot Delete: No Blog of this ID Found" });
    }
    return res.status(200).json({ message: `Deleted blog of ID: ${blogID}` });
}

module.exports.getBlogsByUserID = async (req, res, next) => {
    const userID = req.params.id;
    let userBlogs;
    try {
        userBlogs = await User.findById(userID).populate('blogs');
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Wrong User ID" });
    }

    if (!userBlogs) {
        return res.status(404).json({ message: "No Blog Found" });
    }

    return res.status(200).json({ user: userBlogs });
}
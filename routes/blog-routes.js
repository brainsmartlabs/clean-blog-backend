const express = require('express');
const { getAllBlogs, addBlog, updateBlog, getBlogByID, deleteByID, getBlogsByUserID } = require('../controllers/blog-controller.js');

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.post("/add", addBlog);
blogRouter.put("/update/:id", updateBlog);
blogRouter.get("/:id", getBlogByID);
blogRouter.delete("/:id", deleteByID);
blogRouter.get('/user/:id', getBlogsByUserID)


module.exports = blogRouter;
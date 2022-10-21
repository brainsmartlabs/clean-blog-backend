const express = require('express');
const { getAllUsers, signUp, login } = require('../controllers/user-controller.js');

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup", signUp);
userRouter.post("/login", login);

module.exports = userRouter;
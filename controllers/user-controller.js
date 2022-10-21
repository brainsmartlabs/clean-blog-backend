const User = require('../models/User.js');
const bcrypt = require('bcrypt');

module.exports.getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    }
    catch (err) {
        return console.log(err);
    }
    if (!users) {
        return res.status(404).json({ message: "Users Collection Not Found" });
    }
    else {
        return res.status(200).json({ users });
    }
}

module.exports.signUp = async (req, res, next) => {
    const { name, email, password } = req.body;
    let exisitingUser;
    try {
        exisitingUser = await User.findOne({ email });
    } catch (err) {
        return console.log(err);
    }

    if (exisitingUser) {
        return res.status(400).json({ message: "User Already Exisits! Login Instead" });
    }

    const hashedPassword = bcrypt.hashSync(password, 6);

    const user = new User({
        name,
        email,
        password: hashedPassword,
        blogs: [],
    });

    try {
        await user.save();
    } catch (err) {
        return console.log(err)
    }
    return res.status(200).json({ user })
}

module.exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    let exisitingUser;
    try {
        exisitingUser = await User.findOne({ email });
    } catch (err) {
        return console.log(err);
    }

    if (!exisitingUser) {
        return res.status(404).json({ message: "Could not find the user of this email" });
    }


    const isPasswordCorrect = bcrypt.compareSync(password, exisitingUser.password);

    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Incorrect Password" })
    }


    return res.status(200).json({ message: "Login Sucessfull", user: exisitingUser });
}


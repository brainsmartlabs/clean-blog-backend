const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const userRoutes = require('./routes/user-routes.js');
const blogRoutes = require('./routes/blog-routes.js')


mongoose.connect('mongodb+srv://blog_admin:blog_password@cluster0.bdcpotp.mongodb.net/Blog?retryWrites=true&w=majority')
    .then(() => app.listen(3300))
    .then(console.log("Connected to Database & listning: Port 3300"))
    .catch((err) => { console.log('There is an error' + err) });

const app = express();
app.use(cors());
app.use(express.json());


app.use((req, res, next) => {
    console.log(req.url);
    next();
})

app.use('/api/user', userRoutes);
app.use('/api/blog', blogRoutes);


app.use("/api", (req, res, next) => {
    res.send("Hello World");
});




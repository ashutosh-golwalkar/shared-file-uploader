const express = require("express");
const fileUpload = require('express-fileupload');
const cors = require('cors');
const path = require('path');
const { hostname, networkInterfaces } = require('os');
const { uploadController, listController } = require("./src/controllers");
const middleware = require('./src/middlewares');
const logger = require("./src/utils/logger");
require('dotenv').config();

const app = express();
const PORT = 4000;
//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(fileUpload());



app.use('/api', (req, res, next) => {
    console.log("THIS IS GETTING CALLED");
    console.log(req)
    next();
})
//Adding Controller Routes
uploadController(app, middleware);
listController(app);

//Rendering CSS
app.get('/style.css', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', "style.css"));
});

//Rendering HTML
app.get("/home", (req, res) => {
    logger.info(`App - Rendering HTML`)
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.get('/', (req,res) => {
    logger.info(`App - Redirecting from root to /home`)
    res.redirect('/home');
});


//Starting Project
app.listen(process.env.PORT,
    () => {
    logger.info(`Server started on port ${process.env.PORT}`);
});

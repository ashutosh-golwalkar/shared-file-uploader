const express = require("express");
const fileUpload = require('express-fileupload');
const path = require('path');
const cors = require('cors');
const controllers = require('./src/controllers');
const middleware = require('./src/middlewares');
const logger = require("./src/utils/logger");
require('dotenv').config();

const app = express();
//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cors());

//Adding Controller Routes
controllers(app, middleware);

//Rendering CSS
app.get('/style.css', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', "style.css"));
});

app.get('/home', (req, res) => {
    res.render("index.ejs", {
        rootIP: process.env.ROOT_IPV4,
        port: process.env.PORT,
        version: 'V2'
    });
});

//Rendering HTML
// app.get("/home", (req, res) => {
//     logger.info(`App - Rendering HTML`)
//     const options = {
//         root: path.join(__dirname),
//         rootIP: process.env.ROOT_IPV4
//     }
//     res.sendFile(path.join('public', 'index.html'), options);
// });


app.get('/', (req,res) => {
    logger.info(`App - Redirecting from root to /home`)
    res.redirect('/home');
});


//Starting Project
app.listen(process.env.PORT,
    () => {
    logger.info(`Server started on port ${process.env.PORT}`);
});

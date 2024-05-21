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

app.get('/', (req,res) => {
    return res.status(405).json({
        status: 405,
        message: "Not Allowed"
    });
});


//Starting Project
app.listen(process.env.PORT,
    () => {
    logger.info(`Server started on port ${process.env.PORT}`);
});

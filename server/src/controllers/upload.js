const uploader = require('../services/uploader');
const multiUpload = require('../services/multiUploader');
const logger = require('../utils/logger');

module.exports = (app, { verifyFileType, fileSizeLimiter }) => {

    app.post('/api/v1/upload',
        verifyFileType,
        (req, res) => {
        logger.info(`/v1/upload - Controller - API called`);
        try {
            uploader(req);
            logger.info(`/v1/upload - Controller - API response with a Success`);
            return res.status(200).json({
                status: 200,
                message: "File successfully uploaded"
            });
        } catch (error) {
            logger.error(`/v1/upload - Controller - API execution failed - ${error}`);
            return res.status(500).json({
                status: 500,
                message: "Something went wrong, Please try again later"
            });
        }
    });

    app.post('/api/v2/upload', 
        verifyFileType,
        fileSizeLimiter,
        (req, res) => {
            logger.info(`/v2/upload - Controller - API called`);
            try {
                multiUpload(req);
                logger.info(`/v2/upload - Controller - API response with a Success`);
                return res.status(200).json({
                    status: 200,
                    message: "Files successfully uploaded"
                });
            } catch (error) {
                logger.error(`/v2/upload - Controller - API execution failed - ${error}`);
                return res.status(500).json({
                    status: 500,
                    message: "Something went wrong, Please try again later"
                });
            }
        }
    )
}
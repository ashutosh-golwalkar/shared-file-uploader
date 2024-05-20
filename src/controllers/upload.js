const uploader = require('../services/uploader');
const logger = require('../utils/logger');

module.exports = (app, { verifyFileType }) => {

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
}
const fetchFiles = require('../services/fetchFiles');
const logger = require('../utils/logger');

module.exports = (app) => {

    app.get('/api/v1/files',
        (req,res) => {
            try {
                logger.info("/v1/files - Controller - API called");
                const response = fetchFiles(req);
                logger.info(`/v1/files - Controller - response sent successfully - ${response}`)
                return res.status(200).json({
                    status: 200,
                    data: response
                });
            } catch (error) {
                logger.error(`/v1/files - Controller - API failed with error - ${error}`)
                return res.status(500).json({
                    status: 500,
                    message: "Something went wrong"
                });
            }
        }
    )
}
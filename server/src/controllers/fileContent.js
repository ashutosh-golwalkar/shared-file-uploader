const fetchFileContent = require('../services/fetchFileContent');
const logger = require('../utils/logger');

module.exports = (app, middleware) => {

    app.get('/api/v1/file-content',
        (req, res) => {

            try {
                console.log(req.query);
                const response = fetchFileContent(req.query);
                console.log(response)
                logger.info(`/v1/file-content - Controller - response sent successfully - ${response}`)
                return res.status(200).json({
                    status: 200,
                    data: response
                });
            } catch (error) {
                logger.error(`/v1/file-content - Controller - API failed with error - ${error}`)
                return res.status(500).json({
                    status: 500,
                    message: "Something went wrong"
                });
            }
        });
}

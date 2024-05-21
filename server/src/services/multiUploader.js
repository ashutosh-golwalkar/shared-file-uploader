const path = require('path');
const logger = require('../utils/logger');
const handleDuplicateFiles = require('../utils/handleDuplicateFiles');
const fetchFilesFomDir = require('../utils/fetchFilesFromDir');

module.exports = (request) => {
    const rootDir = path.join(__dirname, process.env.DATABASE_PATH);
    const files = request.files;
    
    const uploadedFiles = fetchFilesFomDir(rootDir);
    Object.keys(files).forEach(key => {
        const fileName = handleDuplicateFiles(uploadedFiles, files[key].name);
        const filePath = path.join(rootDir, fileName);
        
        logger.info(`/v2/upload - Service - Uploading file with settings - Filename - ${
            fileName}, filePath - ${filePath}`);
        files[key].mv(filePath, (error) => {
            if(error) {
                logger.error(`/v2/upload - Service - Error Uploading file ${fileName} - ${error}`);
                throw new Error(error);
            }
        })
    });

    logger.info(`/v2/upload - Service - Files Uploaded successfully`);
    return;
}
const path = require('path');
const logger = require('../utils/logger');
const fetchFilesFomDir = require('../utils/fetchFilesFromDir');
const handleDuplicateFiles = require('../utils/handleDuplicateFiles');


module.exports = (request) => {
    const rootDir = path.join(__dirname, process.env.DATABASE_PATH);
    const file = request.files.uploadedFile;
    
    const files = fetchFilesFomDir(rootDir);
    const fileName = handleDuplicateFiles(files, file.name);
    const filePath = path.join(rootDir, fileName);

    logger.info(`/v1/upload - Service - Uploading file with settings - Filename - ${
        fileName}, filePath - ${filePath}`);
    file.mv(filePath, (err) => {
        if(err) {
            logger.error(`/v1/upload - Service - Error Uploading file - ${err}`);
            throw new Error(err);
        } else return;
    });
}
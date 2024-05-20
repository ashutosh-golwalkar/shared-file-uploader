const path = require('path');
const fs = require('fs');
const logger = require('../utils/logger');

const handleDuplicateFiles = (dir, fileName) => {
    const files = fs.readdirSync(dir);
    const fileSplit = fileName.split('.');
    const extension = '.' + fileSplit.pop();
    const name = fileSplit.join('');
    let newName = name;
    let i = 1;
    while(files.includes(newName + extension)) {
        newName = `${name}(${i})`;
        i++;
    }
    return newName + extension;
}

module.exports = (request) => {
    const rootDir = path.join(__dirname, process.env.DATABASE_PATH);
    const file = request.files.uploadedFile;
    const fileName = handleDuplicateFiles(rootDir, file.name);
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
const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger');

const filePath = path.join(__dirname, '../..', 'database', 'files');

module.exports = (request) => {
    logger.info(`/v1/lists - services - Reading directory with filePath - ${filePath}`)
    const files = fs.readdirSync(filePath);
    return files;
}


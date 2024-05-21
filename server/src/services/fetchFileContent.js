
const fs = require('fs');
const path = require('path');

const fetchFileContent = ({ name }) => {
    const filePath = path.join(__dirname, '../..', 'database', 'files');
    return JSON.parse(fs.readFileSync(path.join(filePath, name), 'utf8'));
}

module.exports = fetchFileContent;
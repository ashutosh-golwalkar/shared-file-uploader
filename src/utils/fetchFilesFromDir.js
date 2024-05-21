const fs = require('fs');

const fetchFilesFomDir = (location) => {
    return fs.readdirSync(location);
}

module.exports = fetchFilesFomDir;
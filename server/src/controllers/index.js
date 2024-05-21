const uploadController = require('./upload');
const listController = require('./listFiles');
const fileContentController = require('./fileContent');

module.exports = (app, middleware) => {
    uploadController(app, middleware);
    listController(app, middleware);
    fileContentController(app, middleware);
}

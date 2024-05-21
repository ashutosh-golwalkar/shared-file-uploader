const LIMIT_IN_MB = process.env.FILE_SIZE || 4;
const FILE_SIZE_LIMIT = LIMIT_IN_MB * 1024 * 1024;

const fileSizeLimiter = (req, res, next) => {
    const files = req.files;
    const overLimitFiles = [];

    for(let key in files) {
        if(files[key].size > FILE_SIZE_LIMIT) {
            overLimitFiles.push(files[key].name);
        }
    }
    
    if(overLimitFiles.length) {
        return res.status(400).json({
            status: 400,
            message: "File(s) Exceed the Limit cap",
            data: overLimitFiles
        });
    }
    next();
}

module.exports = fileSizeLimiter;
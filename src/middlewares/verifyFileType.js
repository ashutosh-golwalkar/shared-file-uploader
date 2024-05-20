const verifyFileType = (req,res, next) => {
    const config = req.config || {};
    const acceptedFileTypes = config.acceptedTypes || [];
    const file = req.files;
    if(!file)
        return res.status(400).json({
            status: 400,
            message: "File is Missing"
        });

    if(file.uploadedFile.mimetype !== 'application/json') {
        return res.status(400).json({
            status: 400,
            message: "Invalid file format"
        });
    }
    next();
}

module.exports = verifyFileType;
const verifyFileType = (req, res, next) => {
  const acceptedFileTypes = process.env.ACCEPTED_FILE_TYPE.split(",");
  const files = req.files;
  if (!files)
    return res.status(400).json({
      status: 400,
      message: "File is Missing",
    });

    try {

      for(let filename in files) {
        const file = files[filename];
        if (!acceptedFileTypes.includes(file.mimetype)) {
          return res.status(400).json({
            status: 400,
            message: "Invalid file format",
          });
        }
      }
      next();
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Something went wrong,please try again later",
      });
    }

};

module.exports = verifyFileType;

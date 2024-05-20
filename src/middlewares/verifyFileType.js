const verifyFileType = (req, res, next) => {
  const acceptedFileTypes = process.env.ACCEPTED_FILE_TYPE.split(",");
  const file = req.files;
  if (!file)
    return res.status(400).json({
      status: 400,
      message: "File is Missing",
    });

  if (!acceptedFileTypes.includes(file.uploadedFile.mimetype)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid file format",
    });
  }
  next();
};

module.exports = verifyFileType;

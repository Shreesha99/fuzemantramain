exports.uploadImage = (req, res) => {
    res.json({ filePath: `/uploads/${req.file.filename}` });
  };
  
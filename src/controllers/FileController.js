const Box = require("../models/Box");
const File = require("../models/File");

module.exports = {
  async store(req, res) {
    const box = await Box.findById(req.params.id);

    const file = await File.create({
      title: req.file.originalname,
      path: req.file.key,
    });

    box.files.push(file);

    await box.save();

    req.io.emit("file", file);

    return res.json(file);
  },
};

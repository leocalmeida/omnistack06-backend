const Box = require("../models/Box");

module.exports = {
  async store(req, res) {
    const boxName = req.body;

    const box = await Box.create(boxName);

    req.io.emit("connectRoom", box);
    return res.json(box);
  },

  async show(req, res) {
    const box = await Box.findById(req.params.id).populate({
      path: "files",
      options: {
        sort: {
          createdAt: -1,
        },
      },
    });

    return res.json(box);
  },
};

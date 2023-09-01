const Society = require("../models/Society");
const url = require("url");

getAll = async (req, res) => {
  try {
    // get list
    const societies = await Society.find({});
    res.status(200).json({ societies });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const society = await Society.findById(id);
    res.status(200).json({ society });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getAll,
  getOne
};

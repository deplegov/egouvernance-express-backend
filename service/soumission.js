const Soumission = require("../models/Soumission");
const url = require("url");
const mongoose = require("mongoose");

createSoumission = async (req, res) => {
  try {
    const { society, dateSoumission, tender, status } = JSON.parse(
      req.body.data
    );
    society._id = new mongoose.Types.ObjectId(society._id);
    tender._id = new mongoose.Types.ObjectId(tender._id);
    tender.dateEmission = new Date(tender.dateEmission);
    tender.dateLimit = new Date(tender.dateLimit);
    const soumission = await Soumission.create({
      society,
      dateSoumission,
      tender,
      status,
      files: req.files.map((file) => file.filename),
    });
    res.status(201).json({ soumission });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

getAll = async (req, res) => {
  try {
    let query = url.parse(req.url, true).query;
    const page = query.page || 1;
    const pageNumber = query.pageNumber;
    const criteria = {};
    if (query.society) criteria["society.name"] = query.society;
    // pagination
    const limit = pageNumber || 10;
    const offset = (page - 1) * limit;
    const count = await Soumission.count(criteria);
    let totalPage = Math.floor(Number(count) / limit);
    if (Number(count) % limit != 0) {
      totalPage = totalPage + 1;
    }
    const pagination = {
      page,
      pageNumber: limit,
      totalPages: totalPage,
    };
    // get list
    const soumissions = await Soumission.find(criteria)
      .skip(offset)
      .limit(limit);
    res.status(200).json({ soumissions, pagination });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const soumission = await Soumission.findById(id);
    res.status(200).json({ soumission });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

soumissionNumber = async (req, res) => {
  try {
    let query = url.parse(req.url, true).query;
    const criteria = {};
    const soumissionDateCriteria = {};
    if (query.date1) soumissionDateCriteria["$gte"] = query.date1;
    if (query.date2) soumissionDateCriteria["$lte"] = query.date2;
    if (Object.keys(soumissionDateCriteria).length > 0)
      criteria.dateSoumission = soumissionDateCriteria;
    const count = await Soumission.count(criteria);
    res.status(200).json({ count });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

reussiteNumber = async (req, res) => {
  try {
    let query = url.parse(req.url, true).query;
    const criteria = {};
    const soumissionDateCriteria = {};
    if (query.date1) soumissionDateCriteria["$gte"] = query.date1;
    if (query.date2) soumissionDateCriteria["$lte"] = query.date2;
    if (Object.keys(soumissionDateCriteria).length > 0)
      criteria.dateSoumission = soumissionDateCriteria;
    criteria.status = 0;
    const count0 = await Soumission.count(criteria);
    criteria.status = 1;
    const count1 = await Soumission.count(criteria);
    let count = count1 * 100 / (count0 + count1);
    res.status(200).json({ count });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createSoumission,
  getAll,
  getOne,
  soumissionNumber,
  reussiteNumber,
};

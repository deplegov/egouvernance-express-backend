const express = require("express");
const { getAll, getOne } = require("../service/society");
const router = express.Router();

router.get('/', getAll);
router.get('/:id', getOne);

module.exports = router;
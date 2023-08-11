const express = require('express');
const router = express.Router();
const { getAll } = require('../service/Example');

router.get('/', getAll);

module.exports = router;
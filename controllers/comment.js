const express = require("express");
const router = express.Router();
const {
  insertComment,
  getCommentaire,
} = require("../service/comment");

router.get("/", getCommentaire);
router.post("/", insertComment);

module.exports = router;

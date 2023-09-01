const express = require("express");
const {
  createSoumission,
  getAll,
  getOne,
  soumissionNumber,
  reussiteNumber,
} = require("../service/soumission");
const router = express.Router();
const multer = require("multer");
const uuidv4 = require('uuid/v4')
const DIR = "./public/files";

const storage = multer.diskStorage({
  destination: DIR,
  filename: (req, file, cb) => {
    const fileName = uuidv4() + "-" + file.originalname.toLowerCase().split(" ").join("-");
    cb(null, fileName);
  },
});

var upload = multer({ storage });

router.post("/", upload.array("files"), createSoumission);
router.get("/", getAll);
router.get("/count", soumissionNumber);
router.get("/reussite", reussiteNumber);
router.get("/:id", getOne);

module.exports = router;

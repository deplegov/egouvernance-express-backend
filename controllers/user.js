const express = require("express");
const router = express.Router();
const {
  login,
  validate,
  activate,
  deactivate,
  signup,
  updateUser,
} = require("../service/user");

router.post("/login", login);
router.put("/validate/:userId", validate);
router.put("/activate/:userId", activate);
router.put("/deactivate/:userId", deactivate);
router.post("/", signup);
router.put("/:id", updateUser);

module.exports = router;

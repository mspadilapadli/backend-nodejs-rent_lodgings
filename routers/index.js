const express = require("express");
const router = express.Router();

router.use("/lodgings", require("./lodging"));
router.use("/types", require("./type"));

module.exports = router;

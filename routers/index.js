const express = require("express");
const router = express.Router();

router.use("/lodgings", require("./lodging"));

module.exports = router;

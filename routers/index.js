const express = require("express");
const router = express.Router();

router.use("/pub", require("./lodging"));
router.use("/users", require("./userRoute"));
router.use("/lodgings", require("./lodging"));
router.use("/types", require("./type"));

module.exports = router;

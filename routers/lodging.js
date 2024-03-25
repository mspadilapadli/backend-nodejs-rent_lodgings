const express = require("express");
const router = express.Router();
const { Lodging, User } = require("../models");
const LodgingController = require("../controllers/lodgingContoller");

// router.get("/", (req, res) => {
//     res.send(`hello lodgings`);
// });

router.post("/", LodgingController.postRoom);

router.get("/", LodgingController.getAllRooms);

router.get("/:id", LodgingController.getRoomById);

router.put("/:id", LodgingController.putRoom);

router.delete("/:id", LodgingController.deleteRoom);

module.exports = router;

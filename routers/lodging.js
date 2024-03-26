const express = require("express");
const router = express.Router();

const LodgingController = require("../controllers/lodgingContoller");

// router.get("/", (req, res) => {
//     res.send(`hello lodgings`);
// });

router.post("/", LodgingController.postRoom);

router.get("/", LodgingController.getAllRoomsUser);

router.get("/pub", LodgingController.getAllRooms); //public

router.get("/:id", LodgingController.getRoomById);

router.put("/:id", LodgingController.putRoom);

router.delete("/:id", LodgingController.deleteRoom);

router.get("/:id/pub", LodgingController.getRoomById); //public

module.exports = router;

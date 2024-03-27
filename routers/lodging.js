const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const LodgingController = require("../controllers/lodgingContoller");
const authentication = require("../middlewares/authenticate");
const { authorization } = require("../middlewares/authorization");

// router.get("/", (req, res) => {
//     res.send(`hello lodgings`);
// });

router.post("/", authentication, LodgingController.postRoom);

router.get("/", authentication, LodgingController.getAllRoomsUser);

router.get("/pub", LodgingController.getAllRooms); //public

router.get("/:id", authentication, LodgingController.getRoomById);

router.put("/:id", authentication, authorization, LodgingController.putRoom);

router.patch(
    "/:id/imgUrl",
    authentication,
    authorization,
    upload.single("imgUrl"),
    LodgingController.patchImgUrl
);

router.delete(
    "/:id",
    authentication,
    authorization,
    LodgingController.deleteRoom
);

router.get("/:id/pub", LodgingController.getRoomById); //public

module.exports = router;

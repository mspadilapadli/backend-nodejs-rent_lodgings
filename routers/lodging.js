const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const LodgingController = require("../controllers/LodgingContoller");
const authentication = require("../middlewares/authenticate");
const { authorization } = require("../middlewares/authorization");

// router.get("/", (req, res) => {
//     res.send(`hello lodgings`);
// });
router.get("/lodgings", LodgingController.getAllRooms); //public
router.get("/lodgings/:id", LodgingController.getRoomById); //public

router.use(authentication);

router.post("/", LodgingController.postRoom);

router.get("/", LodgingController.getAllRoomsUser);

router.get("/:id", LodgingController.getRoomById);

router.put("/:id", authorization, LodgingController.putRoom);

router.patch(
    "/:id/imgUrl",
    authorization,
    upload.single("imgUrl"),
    LodgingController.patchImgUrl
);

router.delete("/:id", authorization, LodgingController.deleteRoom);

module.exports = router;

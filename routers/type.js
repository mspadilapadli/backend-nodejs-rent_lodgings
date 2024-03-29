const express = require("express");
const TypeController = require("../controllers/TypeController");
const authentication = require("../middlewares/authenticate");
const router = express.Router();

// router.get("/", (req, res) => {
//     res.send(`hello types`);
// });
router.use(authentication);
router.post("/", TypeController.postType);

router.get("/", TypeController.getType);

router.put("/:id", TypeController.putType);

router.delete("/:id", TypeController.deleteType);

module.exports = router;

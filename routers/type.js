const express = require("express");
const TypeController = require("../controllers/TypeController");
const router = express.Router();

// router.get("/", (req, res) => {
//     res.send(`hello types`);
// });

router.post("/", TypeController.postType);

router.get("/", TypeController.getType);

router.put("/:id", TypeController.putType);

router.delete("/:id", TypeController.deleteType);

module.exports = router;

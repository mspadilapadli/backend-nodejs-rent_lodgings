const express = require("express");
const router = express.Router();
const { Lodging, User } = require("../models");

// router.get("/", (req, res) => {
//     res.send(`hello lodgings`);
// });

router.post("/", async (req, res) => {
    try {
        console.log(req.body);
        const rooms = await Lodging.create(req.body);
        res.status(201).json({ message: `new item created`, rooms });
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            res.status(400).json({
                message: error.errors.map((e) => e.message),
            });
            return;
        }
        console.log(error.name);
        res.status(500).json({ message: `Internal Server Error` });
    }
});

router.get("/", async (req, res) => {
    try {
        const rooms = await Lodging.findAll({
            include: {
                model: User,
                attributes: {
                    exclude: ["password"],
                },
            },
        });
        res.status(200).json(rooms);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error` });
    }
});

// router.get("/:id");
// router.put("/:id");
// router.delete("/:id");

module.exports = router;

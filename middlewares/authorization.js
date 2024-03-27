const { Lodging } = require("../models");

const authorization = async (req, res, next) => {
    try {
        let room = await Lodging.findByPk(req.params.id);
        // console.log(room, "<<autorize");
        if (!room) throw { name: "NotFound" };

        if (room.authorId !== req.user.id) throw { name: `Forbidden` };

        next();
    } catch (error) {
        if (error.name === "NotFound") {
            return res.status(404).json({ massage: `room doesn't exists` });
        }
        if (error.name === "Forbidden") {
            return res.status(403).json({ massage: `You're not Unauthorized` });
        }
        console.log(error.name);
        res.status(500).json({ message: `Internal Server Error` });
    }
};

module.exports = authorization;

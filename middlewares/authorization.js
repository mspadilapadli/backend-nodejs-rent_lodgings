const { Lodging } = require("../models");

const authorization = async (req, res, next) => {
    try {
        if (req.user.role === `admin`) {
            next();
        } else if (req.user.role === `Staff`) {
            let room = await Lodging.findByPk(req.params.id);
            // console.log(room, "<<autorize");
            if (!room) throw { name: "NotFound" };

            if (room.authorId !== req.user.id) throw { name: `Forbidden` };

            next();
        }
    } catch (error) {
        next(error);
        //     if (error.name === "NotFound") {
        //         return res.status(404).json({ massage: `room doesn't exists` });
        //     }
        //     if (error.name === "Forbidden") {
        //         return res.status(403).json({ massage: `You're not Unauthorized` });
        //     }
        //     console.log(error.name);
        //     res.status(500).json({ message: `Internal Server Error` });
    }
};

const adminAuthorize = async (req, res, next) => {
    try {
        // console.log(req.user.role, "roleadmnin");
        if (req.user.role === `admin`) {
            next();
        } else throw { name: `Forbidden` };
    } catch (error) {
        next(error);
        // if (error.name === "Forbidden") {
        //     return res.status(403).json({ massage: `You're not Unauthorized` });
        // }
        // console.log(error.name);
        // res.status(500).json({ message: `Internal Server Error` });
    }
};

module.exports = { authorization, adminAuthorize };

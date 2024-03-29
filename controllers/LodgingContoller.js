const cloudinary = require("../helpers/cloudinary");
const { Lodging, User } = require("../models");
const axios = require("axios");
class LodgingController {
    static async postRoom(req, res, next) {
        try {
            // console.log(req.user);
            // console.log(req.user);
            let {
                name,
                facility,
                roomCapacity,
                imgUrl,
                location,
                price,
                typeId,
            } = req.body;
            const rooms = await Lodging.create({
                name,
                facility,
                roomCapacity,
                imgUrl,
                location,
                price,
                typeId,
                authorId: req.user.id,
            });
            res.status(201).json({
                message: `new item ${rooms.name} created `,
                rooms,
                // message: `create success`,
            });
        } catch (error) {
            console.log(error);
            next(error);
            // if (error.name === "SequelizeValidationError") {
            //     res.status(400).json({
            //         message: error.errors.map((e) => e.message),
            //     });
            //     return;
            // }
            // console.log(error.name);
            // res.status(500).json({ message: `Internal Server Error` });
        }
    }

    static async getAllRoomsUser(req, res, next) {
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
            next(error);
            // console.log(error);
            // res.status(500).json({ message: `Internal Server Error` });
        }
    }

    static async getAllRooms(req, res) {
        try {
            const rooms = await Lodging.findAll();
            res.status(200).json(rooms);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: `Internal Server Error` });
        }
    }
    static async getRoomById(req, res, next) {
        try {
            const { id } = req.params;
            const room = await Lodging.findByPk(id);
            if (!room) throw { name: "NotFound" };

            res.status(200).json(room);
        } catch (error) {
            next(error);
            // if (error.name === "NotFound") {
            //     res.status(404).json({ massage: `room doesn't exists` });
            //     return;
            // }
            // console.log(error);
            // res.status(500).json({ message: `Internal Server Error` });
        }
    }
    static async putRoom(req, res, next) {
        try {
            // console.log(req.body);
            // const {name,facility,roomCapacity,imgUrl,location,price,typeId,authorId} = req.body
            const { id } = req.params;
            const room = await Lodging.findByPk(id);
            if (!room) throw { name: "NotFound" };
            let updated = await Lodging.update(req.body, {
                where: { id },
            });

            res.status(200).json({
                message: `${room.name} has been updated `,
                updated,
            });
        } catch (error) {
            next(error);

            //     if (error.name === "SequelizeValidationError") {
            //         res.status(400).json({
            //             message: error.errors.map((e) => e.message),
            //         });
            //     } else if (error.name === "NotFound") {
            //         res.status(404).json({ massage: `room doesn't exists` });
            //     } else {
            //         console.log(error.name);
            //         res.status(500).json({ message: `Internal Server Error` });
            //     }
        }
    }
    static async patchImgUrl(req, res, next) {
        try {
            // console.log(req.body, "<<body");
            // console.log(req.file, "<<file");

            const base64String = req.file.buffer.toString("base64");

            const dataUrl = `data:${req.file.mimetype};base64,${base64String}`;
            // console.log(dataUrl);
            // if (req.file.mimetype !== `image/*`)

            const result = await cloudinary.uploader.upload(dataUrl, {
                public_id: req.file.originalname,
                folder: "My-Room",
            });
            // console.log(result, "<<result ni boss");

            const { id } = req.params;
            const room = await Lodging.findByPk(id);
            if (!room) throw { name: "NotFound" };
            await Lodging.update(
                { imgUrl: result.secure_url },
                {
                    where: { id },
                }
            );

            // console.log(req.body);
            // const {name,facility,roomCapacity,imgUrl,location,price,typeId,authorId} = req.body
            // axios({
            //     method: "get",
            //     url: "/user/12345",
            //     data: {
            //         firstName: "Fred",
            //         lastName: "Flintstone",
            //     },
            // });
            res.status(200).json({
                message: `Image ${room.name} has been updated `,
            });
        } catch (error) {
            next(error);
            // console.log(error);
            // console.log(error.name);
            // res.status(500).json({ message: `Internal Server Error` });

            //     if (error.name === "SequelizeValidationError") {
            //         res.status(400).json({
            //             message: error.errors.map((e) => e.message),
            //         });
            //     } else if (error.name === "NotFound") {
            //         res.status(404).json({ massage: `room doesn't exists` });
            //     } else {
            //         console.log(error.name);
            //         res.status(500).json({ message: `Internal Server Error` });
            //     }
        }
    }
    static async deleteRoom(req, res, next) {
        try {
            const { id } = req.params;
            const room = await Lodging.findByPk(id);
            if (!room) throw { name: "NotFound" };
            await Lodging.destroy({
                where: { id },
            });

            res.status(200).json({
                message: `${room.name} success to delete `,
                // message: `success to delete `,
            });
        } catch (error) {
            next(error);
            // if (error.name === "NotFound") {
            //     res.status(404).json({ massage: `room doesn't exists` });
            // } else {
            //     console.log(error.name);
            //     res.status(500).json({ message: `Internal Server Error` });
            // }
        }
    }
}

module.exports = LodgingController;

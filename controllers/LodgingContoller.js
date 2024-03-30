const { Op } = require("sequelize");
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
            const { search, filter, sort, page } = req.query;
            // console.log(search, "<<<search");
            let option = {};
            option.where = {};

            // * search
            if (search) {
                option.where.name = {
                    [Op.iLike]: `%${search}%`,
                };
            }
            // // * search
            // if (search) {
            //     option.where = {
            //         name: {
            //             [Op.iLike]: `%${search}%`,
            //         },
            //     };
            // }
            // console.log(option, "<<<option");
            // * Filtering
            if (filter) {
                option.where.typeId = filter;
            }
            // if (filter) {
            //     option.where = {
            //         typeId: filter,
            //     };
            // }

            //* sorting
            if (sort) {
                const ordering = sort[0] === "-" ? `DESC` : `ASC`;
                const orderByColom = ordering === `DESC` ? sort.slice(1) : sort;
                option.order = [[orderByColom, ordering]];
            }

            // *pagination
            // console.log(page, "<<page");
            let limit = 10;
            let pageNumber = 1;
            if (page) {
                if (page.size) {
                    limit = page.size;
                    option.limit = limit;
                } else {
                    option.limit = limit;
                }
                if (page.number) {
                    pageNumber = page.number;
                    option.offset = limit * (pageNumber - 1);
                }
            }
            // console.log(option.limit, "<<default limit");
            console.log(option, "<<option ");

            const rooms = await Lodging.findAll(option);
            res.status(200).json(rooms);

            // * meta data
            // const { count, rows } = await Lodging.findAndCountAll(option);
            // res.json({
            //     page: pageNumber,
            //     data: rows,
            //     totalData: count,
            //     totalPage: Math.ceil(count / limit),
            //     dataPerPage: limit,
            // });
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
            await Lodging.update(req.body, {
                where: { id },
            });
            let updated = await Lodging.findByPk(id);
            // console.log(updated);

            res.status(200).json({
                message: `Data with id ${room.id} has been updated`,
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
                message: `${room.name} success to delete`,
                room,
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

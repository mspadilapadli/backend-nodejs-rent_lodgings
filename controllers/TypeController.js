const { Lodging, User, Type } = require("../models");

class TypeController {
    static async postType(req, res) {
        try {
            // console.log(req.body);
            const type = await Type.create(req.body);
            res.status(201).json({
                message: `new type ${type.name} created `,
            });
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                res.status(400).json({
                    message: error.errors.map((e) => e.message),
                });
                return;
            }
            // console.log(error.name);
            res.status(500).json({ message: `Internal Server Error` });
        }
    }
    static async getType(req, res) {
        try {
            const types = await Type.findAll();
            res.status(200).json(types);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: `Internal Server Error` });
        }
    }
    static async putType(req, res) {
        try {
            // console.log(req.body);
            // const {name,facility,roomCapacity,imgUrl,location,price,typeId,authorId} = req.body
            const { id } = req.params;
            const type = await Type.findByPk(id);
            if (!type) throw { name: "NotFound" };
            await Type.update(req.body, {
                where: { id },
            });

            res.status(200).json({
                message: `${type.name} has been updated `,
            });
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                res.status(400).json({
                    message: error.errors.map((e) => e.message),
                });
            } else if (error.name === "NotFound") {
                res.status(404).json({ massage: `type doesn't exists` });
            } else {
                console.log(error.name);
                res.status(500).json({ message: `Internal Server Error` });
            }
        }
    }
    static async deleteType(req, res) {
        try {
            const { id } = req.params;
            const type = await Type.findByPk(id);
            if (!type) throw { name: "NotFound" };
            await Type.destroy({
                where: { id },
            });

            res.status(200).json({
                message: `${type.name} success to delete `,
            });
        } catch (error) {
            if (error.name === "NotFound") {
                res.status(404).json({ massage: `type doesn't exists` });
            } else {
                console.log(error.name);
                res.status(500).json({ message: `Internal Server Error` });
            }
        }
    }
}

module.exports = TypeController;

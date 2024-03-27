const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User } = require("../models");

class UserController {
    static async register(req, res) {
        try {
            console.log(req.body);
            let user = await User.create(req.body);
            // console.log(user);

            res.status(201).json({ message: `${user.email} has been created` });
        } catch (error) {
            // console.log(error.name);
            if (error.name === `SequelizeValidationError`) {
                return res
                    .status(400)
                    .json({ message: error.errors.map((e) => e.message) });
            }
            console.log(error);
            res.status(500).json({ message: `Internal Server Error` });
            // res.status(500).json(error);
        }
    }

    static async login(req, res) {
        try {
            let { email, password } = req.body;
            if (!email || !password) throw { name: `InvalidInput` };

            const user = await User.findOne({
                where: { email },
            });

            // console.log(user);
            const comparePass = comparePassword(password, user.password);
            if (!user || !comparePass) throw { name: `InvalidUser` };
            // console.log(comparePass);

            let token = createToken({ id: user.id });

            res.status(200).json({
                message: `Login berhasil`,
                access_token: token,
            });
        } catch (error) {
            // console.log(error.name);
            if (error.name === `InvalidInput`) {
                return res
                    .status(400)
                    .json({ message: `Email or Password is required` });
            }

            if (error.name === `InvalidUser`) {
                return res
                    .status(401)
                    .json({ message: `Invalid email or password` });
            }
            res.status(500).json({ message: `Internal Server Error` });
            // console.log(error);
            // res.status(500).json(error);
        }
    }
}

module.exports = UserController;

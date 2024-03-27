const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
    try {
        // console.log(req.headers.authorization);

        // *ambil bearer dan tokenya
        let getToken = req.headers.authorization;
        if (!getToken) throw { name: `InvalidToken` };

        // *destruct dan handle bearernya sama atau tidak
        let [bearer, token] = getToken.split(" ");
        if (bearer !== `Bearer`) throw { name: `InvalidToken` };
        // console.log(bearer, "<<<<bearer");

        // *ambil data/payload dengan verify tokennya
        let payload = verifyToken(token);
        // console.log(payload);

        // * find user byId dan handle jika null
        let user = await User.findByPk(payload.id);
        // console.log(user);
        if (!user) throw { name: `InvalidToken` };

        // * tambahkan properti user pada req, dgn atribut id dan role nya
        req.user = { id: user.id, role: user.role };

        next();
    } catch (error) {
        next(error);
        //     if (error.name === `InvalidToken`) {
        //         return res.status(401).json({ message: `Unauthenticated` });
        //     }
        //     res.status(500).json({ message: `Internal Server Error` });
    }
};
module.exports = authentication;

const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
    try {
        // console.log(req.headers.authorization);
        let getToken = req.headers.authorization;
        if (!getToken) throw { name: `InvalidToken` };

        let [bearer, token] = getToken.split(" ");
        if (bearer !== `Bearer`) throw { name: `InvalidToken` };
        // console.log(bearer, "<<<<bearer");
        let payload = verifyToken(token);
        // console.log(payload);

        let user = await User.findByPk(payload.id);
        // console.log(user);
        if (!user) throw { name: `InvalidToken` };

        req.user = { id: user.id, role: user.role };

        next();
    } catch (error) {
        if (error.name === `InvalidToken`) {
            return res.status(401).json({ message: `Unauthenticated` });
        }
        res.status(500).json({ message: `Internal Server Error` });
    }
};
module.exports = authentication;

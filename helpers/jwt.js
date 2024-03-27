const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

let createToken = (payload) => {
    let token = jwt.sign(payload, secret);
    return token;
};

let verifyToken = (token) => {
    let payload = jwt.verify(token, secret);
    return payload;
};

module.exports = { createToken, verifyToken };

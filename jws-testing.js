const { createToken, verifyToken } = require("./helpers/jwt");
const { hashPassword, comparePassword } = require("./helpers/bcrypt");

let data = {
    name: "padila",
    gneder: "male",
    password: 12345,
};

let token = createToken(data);
// console.log(token);
let payload = verifyToken(token);
// console.log(payload, "payload ");

let password = `abcda`;
let hash = hashPassword(password);
console.log(hash);

let compare = comparePassword(`abcda`, hash);
console.log(compare);

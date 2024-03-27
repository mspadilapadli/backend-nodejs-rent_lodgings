const { hashSync, compareSync } = require("bcryptjs");
// const bcrypt = require("bcryptjs");

// let hashPassword = (password) => {
//     const salt = bcrypt.genSaltSync(8);
//     return bcrypt.hashSync(password, salt);
// };
// let comparePassword = (passwordIput, PasswordDB) => {
//     return bcrypt.compareSync(passwordIput, PasswordDB);
// };

// module.exports = { hashPassword, comparePassword };
module.exports = {
    hashPassword: (password) => hashSync(password),
    comparePassword: (passwordInput, passwordDB) =>
        compareSync(passwordInput, passwordDB),
};

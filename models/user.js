"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.hasMany(models.Lodging, { foreignKey: "authorId" });
        }
    }
    User.init(
        {
            username: DataTypes.STRING,
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    args: true,
                    message: `Email already exists`,
                },
                validate: {
                    notEmpty: {
                        msg: `email is required`,
                    },
                    notNull: {
                        msg: `email is required`,
                    },
                    isEmail: {
                        args: true,
                        msg: `Invalid email format`,
                    },
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: `password is required`,
                    },
                    notNull: {
                        msg: `password is required`,
                    },
                    minLength(value) {
                        if (value.length < 5) {
                            throw new Error(`Minimum password character is 5`);
                        }
                    },
                },
            },
            role: {
                type: DataTypes.STRING,
                defaultValue: `Staff`,
            },
            phoneNumber: DataTypes.STRING,
            address: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "User",
            hooks: {
                beforeCreate(user, option) {
                    // console.log(user.password);
                    user.password = hashPassword(user.password);
                },
            },
        }
    );
    return User;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Lodging extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Lodging.belongsTo(models.Type, { foreignKey: "typeId" });
            Lodging.belongsTo(models.User, { foreignKey: "authorId" });
        }
    }
    Lodging.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: `name is required`,
                    },
                    notNull: {
                        msg: `name is required`,
                    },
                },
            },
            facility: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: `facility is required`,
                    },
                    notNull: {
                        msg: `facility is required`,
                    },
                },
            },
            roomCapacity: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: `room capacity is required`,
                    },
                    notNull: {
                        msg: `room capacity is required`,
                    },
                },
            },
            imgUrl: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: `imgUrl is required`,
                    },
                    notNull: {
                        msg: `imgUrl is required`,
                    },
                    isUrl: true,
                },
            },
            location: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: `location is required`,
                    },
                    notNull: {
                        msg: `location is required`,
                    },
                },
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: `price is required`,
                    },
                    notNull: {
                        msg: `price is required`,
                    },
                    min(value) {
                        if (value <= 1500000) {
                            throw new Error(`minimum price is 1500000`);
                        }
                    },
                },
            },
            typeId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: `typeId is required`,
                    },
                    notNull: {
                        msg: `typeId is required`,
                    },
                },
            },
            authorId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: `authorId is required`,
                    },
                    notNull: {
                        msg: `authorId is required`,
                    },
                },
            },
        },
        {
            sequelize,
            modelName: "Lodging",
        }
    );
    return Lodging;
};

"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Lodgings", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            facility: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            roomCapacity: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            imgUrl: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            location: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            price: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            typeId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: "Types",
                    key: "id",
                },
            },
            authorId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: "Users",
                    key: "id",
                },
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Lodgings");
    },
};

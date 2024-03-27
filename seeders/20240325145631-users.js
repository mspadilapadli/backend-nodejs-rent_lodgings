"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const data = require("../data/admin.json").map((el) => {
            el.createdAt = el.updatedAt = new Date();
            return el;
        });
        await queryInterface.bulkInsert("Users", data);
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Users", null, {});
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};

const request = require("supertest");
const app = require("../app");
const { sequelize, Lodging, User } = require("../models");
const { createToken } = require("../helpers/jwt");

let access_token;
beforeAll(async () => {
    try {
        const data = require("../data/lodgings.json");
        // const dataUser = require("../data/admin.json");
        // const user =  await User.bulkCreate(data);

        const user = await User.create({
            username: "admin",
            email: "admin@gmail.com",
            password: "12345",
            role: "admin",
            phoneNumber: "081234567890",
            address: "Bekasi",
        });
        // access_token = createToken(user.id);
        // console.log(access_token, "<<<<<accesstoken");
        await Lodging.bulkCreate(data);
    } catch (error) {
        console.log(error, "<<< before all");
    }
});

describe("POST /login", () => {
    test(`Login Success`, async () => {
        const response = await request(app)
            .post(`/users/login`)
            .send({ email: `admin@gmail.com`, password: `12345` });

        const { body, status } = response;
        console.log(body, "<<<<<<<<<body");
        access_token = body.access_token;

        expect(status).toBe(200);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("access_token", expect.any(String));
    });
});

describe(`GEt /pub/lodgings`, () => {
    test(`success get /pub/lodgings`, async () => {
        const response = await request(app).get(`/pub/lodgings`);

        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toBeInstanceOf(Array);
        expect(body[0]).toBeInstanceOf(Object);

        // console.log(response, "<<<<");
    });
});

afterAll(async () => {
    try {
        await sequelize.queryInterface.bulkDelete("Users", null, {
            truncate: true,
            cascade: true,
            restartIdentity: true,
        });
        Lodging.destroy({
            where: {},
            truncate: true,
            cascade: true,
            restartIdentity: true,
        });
        // User.destroy({
        //     where: {},
        //     restartIdentity: true,
        // });
    } catch (error) {
        console.log(error, "<<<< afterAll");
    }
});

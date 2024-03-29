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

//! ================= testing admin login ============================

describe("POST /login", () => {
    //* a. berhasil login
    test(`Login Success`, async () => {
        const response = await request(app)
            .post(`/users/login`)
            .send({ email: `admin@gmail.com`, password: `12345` });

        const { body, status } = response;
        // console.log(body.access_token, "<<<<<<<<<body");
        access_token = body.access_token;

        expect(status).toBe(200);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("access_token", expect.any(String));
    });

    //* b. Email tidak diberikan /diinput
    test(`error email empty`, async () => {
        const response = await request(app)
            .post(`/users/login`)
            .send({ password: `12345` });

        const { body, status } = response;

        expect(status).toBe(400);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", "Email or Password is required");
    });

    //* c. Password tidak diberikan /diinput
    test(`error password empty`, async () => {
        const response = await request(app)
            .post(`/users/login`)
            .send({ email: `admin@gmail.com` });

        const { body, status } = response;

        expect(status).toBe(400);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", "Email or Password is required");
    });

    //* d. Email diberikan invalid/ tidak terdaftar
    test(`error email invalid`, async () => {
        const response = await request(app)
            .post(`/users/login`)
            .send({ email: "invalidAdmin@gmail.com", password: `12345` });

        const { body, status } = response;

        expect(status).toBe(401);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", "Invalid email or password");
    });

    //* d. Password diberikan invalid/ tidak terdaftar
    test(`error password invalid`, async () => {
        const response = await request(app)
            .post(`/users/login`)
            .send({ email: "admin@gmail.com", password: `12345Inavlid` });

        const { body, status } = response;

        expect(status).toBe(401);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", "Invalid email or password");
    });
});

//! ================= testing create ============================
describe(`POST /lodgings`, () => {
    // * a. Berhasil membuat entitas utama
    test(`success create data`, async () => {
        let newData = {
            name: "New Kost add testing",
            facility: "Kasur Twin bad, AC, Toilet dalam, dapur",
            roomCapacity: 3,
            imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEGXBYu21sPbZtg8KgN1b_S3yz5TyeBE86jQ&usqp=CAU",
            location: "Jakarta Selatan",
            price: 3500000,
            typeId: 3,
        };

        const response = await request(app)
            .post(`/lodgings`)
            .send(newData)
            .set("Authorization", `Bearer ` + access_token);
        const { body, status } = response;
        // console.log(body, "<<<<<< body");
        expect(status).toBe(201);
        expect(body).toBeInstanceOf(Object);
        expect(body.rooms).toHaveProperty("id", 4);
    });

    // * b. Gagal menjalankan fitur karena belum login
    test(`error not login`, async () => {
        let newData = {
            name: "New Kost add testing",
            facility: "Kasur Twin bad, AC, Toilet dalam, dapur",
            roomCapacity: 3,
            imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEGXBYu21sPbZtg8KgN1b_S3yz5TyeBE86jQ&usqp=CAU",
            location: "Jakarta Selatan",
            price: 3500000,
            typeId: 3,
        };

        const response = await request(app).post(`/lodgings`).send(newData);

        const { body, status } = response;
        // console.log(body, "<<<<<< body");
        expect(status).toBe(401);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", "Unauthenticated");
    });

    // * c. Gagal menjalankan fitur karena token tidak valid
    test(`error token Invalid`, async () => {
        let newData = {
            name: "New Kost add testing",
            facility: "Kasur Twin bad, AC, Toilet dalam, dapur",
            roomCapacity: 3,
            imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEGXBYu21sPbZtg8KgN1b_S3yz5TyeBE86jQ&usqp=CAU",
            location: "Jakarta Selatan",
            price: 3500000,
            typeId: 3,
        };

        const response = await request(app)
            .post(`/lodgings`)
            .send(newData)
            .set("Authorization", `BearerInvalid ` + access_token);
        const { body, status } = response;
        // console.log(body, "<<<<<< body");
        expect(status).toBe(401);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", "Unauthenticated");
    });

    // * d. Gagal ketika requst body tidak sesui (validation require)
    test(`req body name is null`, async () => {
        let newData = {
            facility: "Kasur Twin bad, AC, Toilet dalam, dapur",
            roomCapacity: 3,
            imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEGXBYu21sPbZtg8KgN1b_S3yz5TyeBE86jQ&usqp=CAU",
            location: "Jakarta Selatan",
            price: 3500000,
            typeId: 3,
        };

        const response = await request(app)
            .post(`/lodgings`)
            .send(newData)
            .set("Authorization", `Bearer ` + access_token);
        const { body, status } = response;
        // console.log(body, "<<<<<< body");
        expect(status).toBe(400);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", ["name is required"]);
    });

    test(`req body name empty string`, async () => {
        let newData = {
            name: "",
            facility: "Kasur Twin bad, AC, Toilet dalam, dapur",
            roomCapacity: 3,
            imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEGXBYu21sPbZtg8KgN1b_S3yz5TyeBE86jQ&usqp=CAU",
            location: "Jakarta Selatan",
            price: 3500000,
            typeId: 3,
        };

        const response = await request(app)
            .post(`/lodgings`)
            .send(newData)
            .set("Authorization", `Bearer ` + access_token);
        const { body, status } = response;
        // console.log(body, "<<<<<< body");
        expect(status).toBe(400);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", ["name is required"]);
    });

    // ==============================================
    test(`req body facility is null`, async () => {
        let newData = {
            name: "New Kost add testing",
            roomCapacity: 3,
            imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEGXBYu21sPbZtg8KgN1b_S3yz5TyeBE86jQ&usqp=CAU",
            location: "Jakarta Selatan",
            price: 3500000,
            typeId: 3,
        };

        const response = await request(app)
            .post(`/lodgings`)
            .send(newData)
            .set("Authorization", `Bearer ` + access_token);
        const { body, status } = response;
        console.log(body, "<<<<<< body");
        expect(status).toBe(400);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", ["facility is required"]);
    });

    test(`req body facility empty string`, async () => {
        let newData = {
            name: "New Kost add testing",
            facility: "",
            roomCapacity: 3,
            imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEGXBYu21sPbZtg8KgN1b_S3yz5TyeBE86jQ&usqp=CAU",
            location: "Jakarta Selatan",
            price: 3500000,
            typeId: 3,
        };

        const response = await request(app)
            .post(`/lodgings`)
            .send(newData)
            .set("Authorization", `Bearer ` + access_token);
        const { body, status } = response;
        // console.log(body, "<<<<<< body");
        expect(status).toBe(400);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", ["facility is required"]);
    });
    // ================================================================

    test(`req body room capacity is null`, async () => {
        let newData = {
            name: "New Kost add testing",
            facility: "Kasur Twin bad, AC, Toilet dalam, dapur",
            imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEGXBYu21sPbZtg8KgN1b_S3yz5TyeBE86jQ&usqp=CAU",
            location: "Jakarta Selatan",
            price: 3500000,
            typeId: 3,
        };

        const response = await request(app)
            .post(`/lodgings`)
            .send(newData)
            .set("Authorization", `Bearer ` + access_token);
        const { body, status } = response;
        // console.log(body, "<<<<<< body");
        expect(status).toBe(400);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", ["room capacity is required"]);
    });

    test(`req body room capacity empty string`, async () => {
        let newData = {
            name: "New Kost add testing",
            facility: "Kasur Twin bad, AC, Toilet dalam, dapur",
            roomCapacity: "",
            imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEGXBYu21sPbZtg8KgN1b_S3yz5TyeBE86jQ&usqp=CAU",
            location: "Jakarta Selatan",
            price: 3500000,
            typeId: 3,
        };

        const response = await request(app)
            .post(`/lodgings`)
            .send(newData)
            .set("Authorization", `Bearer ` + access_token);
        const { body, status } = response;
        // console.log(body, "<<<<<< body");
        expect(status).toBe(400);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", ["room capacity is required"]);
    });
    //  ==============================================================

    test(`req body imgUrl is null`, async () => {
        let newData = {
            name: "New Kost add testing",
            facility: "Kasur Twin bad, AC, Toilet dalam, dapur",
            roomCapacity: 3,
            location: "Jakarta Selatan",
            price: 3500000,
            typeId: 3,
        };

        const response = await request(app)
            .post(`/lodgings`)
            .send(newData)
            .set("Authorization", `Bearer ` + access_token);
        const { body, status } = response;
        // console.log(body, "<<<<<< body");
        expect(status).toBe(400);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", ["imgUrl is required"]);
    });
    test(`req body imgUrl is empty and not url format`, async () => {
        let newData = {
            name: "New Kost add testing",
            facility: "Kasur Twin bad, AC, Toilet dalam, dapur",
            roomCapacity: 3,
            imgUrl: "",
            location: "Jakarta Selatan",
            price: 3500000,
            typeId: 3,
        };

        const response = await request(app)
            .post(`/lodgings`)
            .send(newData)
            .set("Authorization", `Bearer ` + access_token);
        const { body, status } = response;
        console.log(body, "<<<<<< body");
        expect(status).toBe(400);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", [
            "imgUrl is required",
            "Please input url format",
        ]);
    });
    // ==========================================================
    test(`req body location is null `, async () => {
        let newData = {
            name: "New Kost add testing",
            facility: "Kasur Twin bad, AC, Toilet dalam, dapur",
            roomCapacity: 3,
            imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEGXBYu21sPbZtg8KgN1b_S3yz5TyeBE86jQ&usqp=CAU",

            price: 3500000,
            typeId: 3,
        };

        const response = await request(app)
            .post(`/lodgings`)
            .send(newData)
            .set("Authorization", `Bearer ` + access_token);
        const { body, status } = response;
        // console.log(body, "<<<<<< body");
        expect(status).toBe(400);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", ["location is required"]);
    });
    test(`req body location empty string`, async () => {
        let newData = {
            name: "New Kost add testing",
            facility: "Kasur Twin bad, AC, Toilet dalam, dapur",
            roomCapacity: 3,
            imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEGXBYu21sPbZtg8KgN1b_S3yz5TyeBE86jQ&usqp=CAU",
            location: "",
            price: 3500000,
            typeId: 3,
        };

        const response = await request(app)
            .post(`/lodgings`)
            .send(newData)
            .set("Authorization", `Bearer ` + access_token);
        const { body, status } = response;
        // console.log(body, "<<<<<< body");
        expect(status).toBe(400);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", ["location is required"]);
    });
    // ==================================================
    test(`req body price is null`, async () => {
        let newData = {
            name: "New Kost add testing",
            facility: "Kasur Twin bad, AC, Toilet dalam, dapur",
            roomCapacity: 3,
            imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEGXBYu21sPbZtg8KgN1b_S3yz5TyeBE86jQ&usqp=CAU",
            location: "Jakarta Selatan",

            typeId: 3,
        };

        const response = await request(app)
            .post(`/lodgings`)
            .send(newData)
            .set("Authorization", `Bearer ` + access_token);
        const { body, status } = response;
        // console.log(body, "<<<<<< body");
        expect(status).toBe(400);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", ["price is required"]);
    });
    test(`req body price is empty`, async () => {
        let newData = {
            name: "New Kost add testing",
            facility: "Kasur Twin bad, AC, Toilet dalam, dapur",
            roomCapacity: 3,
            imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEGXBYu21sPbZtg8KgN1b_S3yz5TyeBE86jQ&usqp=CAU",
            location: "Jakarta Selatan",
            price: 0,
            typeId: 3,
        };

        const response = await request(app)
            .post(`/lodgings`)
            .send(newData)
            .set("Authorization", `Bearer ` + access_token);
        const { body, status } = response;
        console.log(body, "<<<<<< body");
        expect(status).toBe(400);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", [`Minimum price is 1500000`]);
    });
    // =========================================================
    test(`req body TypeId is null`, async () => {
        let newData = {
            name: "New Kost add testing",
            facility: "Kasur Twin bad, AC, Toilet dalam, dapur",
            roomCapacity: 3,
            imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEGXBYu21sPbZtg8KgN1b_S3yz5TyeBE86jQ&usqp=CAU",
            location: "Jakarta Selatan",
            price: 3500000,
        };

        const response = await request(app)
            .post(`/lodgings`)
            .send(newData)
            .set("Authorization", `Bearer ` + access_token);
        const { body, status } = response;
        // console.log(body, "<<<<<< body");
        expect(status).toBe(400);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", ["typeId is required"]);
    });
    test(`req body TypeId is empty`, async () => {
        let newData = {
            name: "New Kost add testing",
            facility: "Kasur Twin bad, AC, Toilet dalam, dapur",
            roomCapacity: 3,
            imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEGXBYu21sPbZtg8KgN1b_S3yz5TyeBE86jQ&usqp=CAU",
            location: "Jakarta Selatan",
            price: 3500000,
            typeId: "",
        };

        const response = await request(app)
            .post(`/lodgings`)
            .send(newData)
            .set("Authorization", `Bearer ` + access_token);
        const { body, status } = response;
        console.log(body, "<<<<<< body");
        expect(status).toBe(400);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", [`typeId is required`]);
    });
});

//! ================= testing update =============================

//! ==============================================================
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

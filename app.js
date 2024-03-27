require("dotenv").config();
const express = require("express");
const { json } = require("sequelize");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(require("./routers"));
app.use(require("./middlewares/errorHandler"));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

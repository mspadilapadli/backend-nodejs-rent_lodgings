function errorHandler(error, req, res, next) {
    let status = error.status;
    let message = error.message;
    switch (error.name) {
        case "InvalidInput":
            status = 400;
            message = `Email or Password is required`;
            break;
        case "InvalidUser":
            status = 401;
            message = `Invalid email or password`;
            break;
        case "NotFound":
            status = 404;
            message = `Data not found`;
            break;
        case "Forbidden":
            status = 403;
            message = `You're not Unauthorized`;
            break;
        case "InvalidToken":
            status = 401;
            message = `Unauthenticated`;
            break;
        case "SequelizeValidationError":
            status = 400;
            message = error.errors.map((e) => e.message);
            break;
        case "SequelizeUniqueConstraintError":
            status = 400;
            message = error.errors.map((e) => e.message);
            break;

        default:
            status = 500;
            message = `Internal Server Error`;
            break;
    }
    res.status(status).json({
        message,
    });
    // if (err.name === "SequelizeValidationError") {
    //     res.status(400).json({
    //         message: err.errors.map((e) => e.message),
    //     });
    // } else {
    //     console.log(error.name);
    //     res.status(500).json({ message: `Internal Server Error` });
    // }
}

module.exports = errorHandler;

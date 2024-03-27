const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: process.env.CLOUDYNARY_CLOUD_NAME,
    api_key: process.env.CLOUDYNARY_API_KEY,
    api_secret: process.env.CLOUDYNARY_API_SECRET,
});

module.exports = cloudinary;

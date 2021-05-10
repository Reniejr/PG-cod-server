const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const soldierStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: `${process.env.CLOUDINARY_SOLDIERS_FOLDER}`,
    use_filename: true,
    public_id: (req, file) => {
      return file.originalname;
    },
  },
});

const weaponStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: `${process.env.CLOUDINARY_WEAPONS_FOLDER}`,
    use_filename: true,
    public_id: (req, file) => {
      return file.originalname;
    },
  },
});

const soldierUpload = multer({ storage: soldierStorage });
const weaponUpload = multer({ storage: weaponStorage });

module.exports = { soldierUpload, weaponUpload };

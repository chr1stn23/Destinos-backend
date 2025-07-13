const multer = require('multer');
const path = require('path');
const { checkMimeType, imageTypes, videoTypes, magazineTypes } = require('../utils/fileValidators');

const basePath = path.join(__dirname, '..', 'public', 'uploads');

const getTimestamp = () => {
    const now = new Date();
    const pad = (n) => n.toString().padStart(2, '0');
    return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
};

const getStorage = (folder) =>
    multer.diskStorage({
        destination: (req, file, cb) => cb(null, path.join(basePath, folder)),
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            const name = path.basename(file.originalname, ext);
            const timestamp = getTimestamp();
            cb(null, `${name}_${timestamp}${ext}`);
        }
    });

// Aplicamos validadores
const uploadImage = multer({
    storage: getStorage('images'),
    fileFilter: checkMimeType(imageTypes)
});

const uploadVideo = multer({
    storage: getStorage('videos'),
    fileFilter: checkMimeType(videoTypes)
});

const uploadMagazine = multer({
    storage: getStorage('magazines'),
    fileFilter: checkMimeType(magazineTypes)
});

module.exports = {
    uploadImage,
    uploadVideo,
    uploadMagazine
};

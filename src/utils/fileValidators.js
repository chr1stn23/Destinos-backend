const imageTypes = ['image/jpeg', 'image/png', 'image/webp'];
const videoTypes = ['video/mp4', 'video/webm'];
const magazineTypes = ['application/pdf'];

const checkMimeType = (allowedTypes) => (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no permitido'), false);
  }
};

module.exports = {
  imageTypes,
  videoTypes,
  magazineTypes,
  checkMimeType
};

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, '/Users/gabrielbarros/Documents/dev/LOTUS_JOAIS_APP/Lotus-Joias-Application/public/images');
    },

    filename: (req, file, callback) => {
        callback(null, Date.now() + '--' + file.originalname);
    }

});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 3,
    }
});

module.exports = upload;
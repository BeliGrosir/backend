const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './uploads')
    },
    filename: (req, file, callback) => {
        const match = ["image/png", "image/jpeg", "image/jpg"];
    
        if (match.indexOf(file.mimetype) === -1) {
          var message = `${file.originalname} is invalid. Only accept png/jpeg.`;
          return callback(message, null);
        }

        var filename = `${Date.now()}-${file.originalname}`;
        callback(null, filename);
    }
})
var uploadImage = multer({storage: storage}).single("bg_image");

module.exports = {
    uploadImage
}
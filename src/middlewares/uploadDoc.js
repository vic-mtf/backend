const multer  = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, next) {
        next(null, __dirname + '/../docs');
    },
    filename: function (req, file, next) {
      const  name = `${file.fieldname}-${Date.now() + '-' + Math.round(Math.random() * 1E9)}`;
      const ext = file.originalname.slice(
            file.originalname.lastIndexOf('.'),
            file.originalname.length
        );
      next(null, name + ext);
    }
});

module.exports = multer({storage }).single('doc');
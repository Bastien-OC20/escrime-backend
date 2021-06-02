const multer = require("multer")



const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "images", "documents")
    },
    filename: (req, file, callback) => {
       const name = file.originalname.toLowerCase().split(' ').join('-');
        callback(null, name + Date.now())
    }
})

module.exports = multer({storage: storage}).single("image", "documents")
const express = require("express");
const path = require("path");
const multer  = require("multer");
const router = express.Router();
const AuthController = require("../controllers/auth-controller");
const { loggedRedirectionMiddleware } = require("../utils");

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/uploads/'))
    },
    filename: function (req, file, cb) {
        console.log('file',file)
        let extArray = file.mimetype.split("/"); 
        let extension = extArray[extArray.length - 1];
        cb(null, `${req.body.email}_${Date.now()}.${extension}`)
    }
})
const upload = multer({ storage: storage });

router.post("/login", loggedRedirectionMiddleware, AuthController.login);
router.post("/register", loggedRedirectionMiddleware, upload.single('avatar'), AuthController.register);
router.get("/logout", AuthController.logout);


module.exports = router;
const express=require("express");
const { registeruser, authuser } = require("../controller/userController");
const {protect}=require("../middlewares/authMiddleware")
const router =express.Router();

router.route('/').post(registeruser);
router.route('/login').post(authuser);

module.exports=router;
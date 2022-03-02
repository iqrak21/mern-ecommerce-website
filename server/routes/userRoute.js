const express= require("express");
const router = express.Router();
const {registerUser,loginUser,logOut, getforgetPassword, resetPassword, getUserDetails}=require("../controllers/userController");

const {isAuthenticateUser,authorizeRoles} = require("../middleware/auth")

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(getforgetPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logOut);

router.route("/me").get(isAuthenticateUser,getUserDetails);

module.exports = router;
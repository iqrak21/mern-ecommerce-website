const express= require("express");
const router = express.Router();
const {
    registerUser,
    loginUser,
    logOut,
    getforgetPassword,
    resetPassword,
    getUserDetails,
    updateUserPassword, 
    updateUserProfile,
    getAllUser,
    getSingleUser,
    updateUserRole,
    deleteUser
    }=require("../controllers/userController");

const {isAuthenticateUser,authorizeRoles} = require("../middleware/auth")

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(getforgetPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logOut);

router.route("/me").get(isAuthenticateUser,getUserDetails);

router.route("/password/update").put(isAuthenticateUser,updateUserPassword);

router.route("/me/updateprofile").put(isAuthenticateUser,updateUserProfile);

router.route("/admin/users").get(isAuthenticateUser,authorizeRoles("admin"),getAllUser);

router.route("/admin/user/:id").get(isAuthenticateUser,authorizeRoles("admin"),getSingleUser)
.put(isAuthenticateUser,authorizeRoles("admin"),updateUserRole)
.delete(isAuthenticateUser,authorizeRoles("admin"),deleteUser)

module.exports = router;
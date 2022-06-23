const express = require("express");
const {
     getAllProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductDetails,
    createProductReview,
    getProductReviews,
    deleteReview
 } = require("../controllers/productController");


const router = express.Router()
const { isAuthenticateUser, authorizeRoles } = require("../middleware/auth")

router.route("/product").get(getAllProduct);

router.route("/admin/product/New").post(isAuthenticateUser, authorizeRoles("admin"), createProduct);

router.route("/admin/product/:id")
    .put(isAuthenticateUser, authorizeRoles("admin"), updateProduct)
    .delete(isAuthenticateUser, authorizeRoles("admin"), deleteProduct);


router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticateUser, createProductReview);

router.route("/reviews").get(getProductReviews).delete(isAuthenticateUser, deleteReview)





module.exports = router;
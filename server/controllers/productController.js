const ErrorHandler = require("../utils/errorhandler")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const Product = require("../models/productModels");
const ApiFeatures = require("../utils/apifeatures")


//Create Product

exports.createProduct = catchAsyncErrors(async (req, res, next) => {

   req.body.user = req.user.id;

   const product= await Product.create(req.body);

   res.status(201).json({
      success: true,
      product,
   })
});


//Get All Products

exports.getAllProduct = catchAsyncErrors(async (req, res) => {
   let resultperpage = 8;
   const productsCount = await Product.countDocuments();
   const apiFeatures = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultperpage);
   const products = await apiFeatures.query;

   res.status(201).json({
      success: true,
      products,
      productsCount,
      resultperpage,
   })
});

//Get Product Details

exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
   const product = await Product.findById(req.params.id);

   if (!product) {
      return next(new ErrorHandler("Product Not found", 500))

   }
   res.status(200).json({
      success: true,
      product,

   })
});

//Update Product --Admin

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
   let product = await Product.findById(req.params.id);


   if (!product) {
      return next(new ErrorHandler("Product Not found", 500))

   }

   product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,

   });
   res.status(205).json({
      success: true,
      product
   })

});

//Delete Products

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
   const product = await Product.findById(req.params.id);
   if (!product) {

      if (!product) {
         return next(new ErrorHandler("Product Not found", 500))

      }
   }
   await product.remove();

   res.status(202).json({
      success: true,
      message: "Product Delete successfully"
   })
});

// Create New Review or Update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
   const { rating, comment, productId } = req.body;

   const review = {
      user: req.user._id,
      username: req.user.username,
      rating: Number(rating),
      comment,
   };

   const product = await Product.findById(productId);

   const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
   );

   if (isReviewed) {
      product.reviews.forEach((rev) => {
         if (rev.user.toString() === req.user._id.toString())
            (rev.rating = rating), (rev.comment = comment);
      });
   } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
   }

   let avg = 0;

   product.reviews.forEach((rev) => {
      avg += rev.rating;
   });

   product.ratings = avg / product.reviews.length;

   await product.save({ validateBeforeSave: false });

   res.status(200).json({
      success: true,
   });
});

// Get All reviews of a Product

exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {

   const product = await Product.findById(req.query.id);
   if (!product) {
      return next(new ErrorHandler("Product Not Found", 400));
   };

   res.status(200).json({
      success: true,
      reviews: product.reviews,
   })
});

//Delete Review

exports.deleteReview = catchAsyncErrors(async (req, res, next) => {

   const product = await Product.findById(req.query.productId);
   if (!product) {
      return next(new ErrorHandler("Product Not Found", 400));
   }

   const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
   );

   let avg = 0;
   reviews.forEach((rev) => {
      avg += rev.rating;
   });

   const ratings = avg / reviews.length;
   const numOfReviews = reviews.length;

   await Product.findByIdAndUpdate(req.query.productId, {
      reviews,
      ratings,
      numOfReviews,
   }, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
   })

   res.status(200).json({
      success: true,

   })
});

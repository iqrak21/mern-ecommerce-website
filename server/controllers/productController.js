const Product = require("../models/productModels");
const ErrorHandler = require("../utils/errorhandler")
const catchAsyncErrors = require ("../middleware/catchAsyncErrors")
const ApiFeatures= require("../utils/apifeatures")


//Create Product

exports.createProduct =catchAsyncErrors (async (req, res, next) => {

   req.body.user= req.user.id;

   const product = await Product.create(req.body);

   res.status(201).json({
      success: true,
      product,
   })
});


//Get All Products

exports.getAllProduct =catchAsyncErrors( async (req, res) => {
   let resultperpage = 5;
   const productCount = await Product.countDocuments();
   const apiFeatures = new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultperpage);
   const product = await apiFeatures.query;

   res.status(201).json({
      success: true,
      product,
      productCount,
   })
});

//Get Product Details

exports.getProductDetails =catchAsyncErrors(async (req, res, next) => {
   const product = await Product.findById(req.params.id);

   if (!product) {
      return next(new ErrorHandler("Product Not found", 500))

   }
   res.status(200).json({
      success: true,
      product,
      productCount,
   })
});

//Update Product --Admin

exports.updateProduct = catchAsyncErrors (async (req, res, next) => {
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

exports.deleteProduct =catchAsyncErrors (async (req, res, next) => {
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
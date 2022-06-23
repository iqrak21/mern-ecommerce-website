const ErrorHandler = require("../utils/errorhandler")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const User = require("../models/userModels");
const Product = require("../models/productModels");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

//Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { username, email, password } = req.body;
    const user = await User.create({
        username,
        email,
        password,
        avatar: {
            public_id: "78",
            url: "shhaeen",
        },
    });

    sendToken(user, 201, res);
});

//Login User

exports.loginUser = catchAsyncErrors(async (req, res, next) => {

    const { email, password } = req.body;

    // checking if user has given password and email both

    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email and Pasword", 400))

    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid Email or password", 401))
    }
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or password", 401))
    }
    sendToken(user, 200, res);
})

//LogOut User

exports.logOut = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    }),

        res.status(200).json({
            success: true,
            message: "Logged Out successfully"
        });
});

//Forget Password

exports.getforgetPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

     if (!user) {
         return next(new ErrorHandler("User Not Found", 404));
     }
    //Get Reset Password Token

    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email
then ,please ignore it`;

    try {

        await sendEmail({
            email: user.email,
            subject: `Ecommerce Password Recovery`,
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500))
    }

});

//Reset Password

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {

    //Creating token hash
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(new ErrorHandler("Your reset Password Token is invalid or has a expired", 400));
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not password", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    sendToken(user, 200, res);

});

//Get User Details

exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    });

});

//Update User Password

exports.updateUserPassword = catchAsyncErrors(async(req,res,next)=>{

    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect", 400))
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match", 400))  
    }

     user.password=req.body.newPassword;

     await user.save();

     sendToken(user,200,res);

});

//Update User Profile

exports.updateUserProfile = catchAsyncErrors(async(req,res,next)=>{

  const newUserData = ({
      username:req.body.username,
      email : req.body.email,
  });

  const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
      new:true,
      runValidators:true,
      useFindandmodify:false,
  });

  res.status(200).json({
      success:true,
      message:"User Profile Update Successfully!"
  });


});

//Get All Users == (admin)

exports.getAllUser= catchAsyncErrors(async(req,res,next)=>{

    const users = await User.find();
    res.status(200).json({
        success:true,
        users,
    })
});

//Get All User == (admin)

exports.getSingleUser= catchAsyncErrors(async(req,res,next)=>{

    const user = await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`))
    }
    res.status(200).json({
        success:true,
        user,
    })
});

//Update User Role

exports.updateUserProfile = catchAsyncErrors(async(req,res,next)=>{

    const newUserData = ({
        username:req.body.username,
        email : req.body.email,
        role:req.body.role
    });
  
    const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindandmodify:false,
    });
  
    res.status(200).json({
        success:true,
        message:"User Profile Update Successfully!"
    });
  
  });

  //Update User Role --ADMIN

exports.updateUserRole = catchAsyncErrors(async(req,res,next)=>{

    const newUserData = ({
        username:req.body.username,
        email : req.body.email,
        role:req.body.role
    });
  
    const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true,
        useFindandmodify:false,
    });
  
    res.status(200).json({
        success:true,
       
    });
  
  });

    //Delete User --ADMIN

exports.deleteUser = catchAsyncErrors(async(req,res,next)=>{

    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`user does not exits with id:${req.params.id}`,400))
    }

    await user.remove();
  
    res.status(200).json({
        success:true,
        message:"User Delete Successfully!"
        
    });
  
  });

  
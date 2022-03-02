const mongoose = require('mongoose');
const validator = require("validator");
const bcrypt = require("bcrypt") ;
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const Schema = mongoose.Schema;
const JWT_SECRET = "qwertyuiop";
const JWT_EXPIRE ="5d";


const userSchema = new Schema({

    username: {
        type: String,
        required: [true, "Please Enter Username"],
        maxlength: [30, "Username cannot exceeds 30 character"],
        minlength: [5, "Username should have 5 character"]
    },

    email: {
        type: String,
        required: [true, "Please Enter Username"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please Enter Password"],
        minlength: [8, "Password should have 8 character"],
        select: false
    },
    avatar:  {
        
        public_id: {
            type: String,
            required:true

        },
        url: {
            type: String,
            required:true
        }
    },
    role: {
        type: String,
        default: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
    resetPasswordToken: String,
    resetPasswordExpire: Date,


});

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password= await bcrypt.hash(this.password,10)
});

//JWT Token
userSchema.methods.getJWTToken = function(){
return jwt.sign({id:this._id},JWT_SECRET,{
    expiresIn:JWT_EXPIRE,
})
};

//Compare Password

userSchema.methods.comparePassword = async function(enteredPassword){
return await bcrypt.compare(enteredPassword,this.password)
};

//Generating  Password Reset Token

userSchema.methods.getResetPasswordToken = function(){
 //Generating Token
 const resetToken = crypto.randomBytes(20).toString("hex")
 //Hashing and adding ResetPasswordToken to userSchema

 this.resetPasswordToken = crypto
 .createHash("sha256")
 .update(resetToken)
 .digest("hex");
 
 this.resetPasswordExpire = Date.now() + 15 *60 *1000;

 return resetToken;


};

module.exports = mongoose.model("User",userSchema)
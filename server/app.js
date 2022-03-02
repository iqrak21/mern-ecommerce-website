const express = require("express");
const app= express();
const cookiePaerser= require("cookie-parser")

app.use(express.json());
app.use(cookiePaerser());

const errorMiddleware = require("./middleware/error")
const product = require("./routes/productRoute")
const user = require("./routes/userRoute")


//Routes Imports

app.use("/api/v1",product);
app.use("/api/v1",user)

//Middleware for errors

app.use(errorMiddleware);


module.exports=app
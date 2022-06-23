const express = require("express");
const app= express();
const cookiePaerser= require("cookie-parser")
const cors = require("cors")

app.use(express.json());
app.use(cookiePaerser());
app.use(cors())

const errorMiddleware = require("./middleware/error")
const product = require("./routes/productRoute")
const user = require("./routes/userRoute")
const order = require("./routes/orderRoute")


//Routes Imports

app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order)

//Middleware for errors

app.use(errorMiddleware);


module.exports=app
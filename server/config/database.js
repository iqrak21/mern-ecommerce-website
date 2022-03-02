const mongoose = require("mongoose")

const connectDatabase = ()=>{
    mongoose.connect("mongodb://0.0.0.0:27017/Ecommerce",{
    useNewUrlParser:true,
    
  
}).then((data)=>{
    console.log(`Mongodb is connected with server: ${data.connection.host}`);
}).catch((err)=>{
   console.log(err)
})
}

module.exports=connectDatabase;


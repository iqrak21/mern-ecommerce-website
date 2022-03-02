const app= require("./app");
const connectDatabase = require("./config/database")


//Handling Uncaught Exception 

process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log("Shuting down the server due to Uncaught Exception");

    process.exit(1);
})


const PORT=process.env.PORT || 5000;

//Connecting Database

connectDatabase();

const server = app.listen(PORT,()=>{
    console.log('Port is running on PORT' ,PORT)
})

// Unhandled Promise Rejection

process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to unhandle promise rejection");

    server.close(()=>{
        process.exit(1);
    })
})


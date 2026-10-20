const mongoose=require("mongoose");
const mongoUrl="mongodb://127.0.0.1:27017/hotelmanagementsystem";

mongoose.connect(mongoUrl);
const db=mongoose.connection;

db.on('connected',()=>{
    console.log("server is connected")
})

db.on("error",(error)=>{
    console.log("Error in server" ,error);
})

db.on("disconnected",()=>{
    console.log("server is disconnected");
})

module.exports=db;
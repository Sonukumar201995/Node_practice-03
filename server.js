const express=require("express");
const app=express();

app.get('/',(req,res)=>{
    res.send("wecome to our hotel management system")
})

app.listen(3000,()=>{
    console.log("server is listing")
})


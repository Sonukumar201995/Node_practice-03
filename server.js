const express=require("express");
const app=express();


// const staff=require("./models/staff.js")

const db=require("./db.js")

const staffRouter=require("./routes/staffRouter.js")



app.use(express.json())//body-parser

app.get('/',(req,res)=>{
    res.send("welcome to our hotel management system")
})

// connect staff router
app.use("/staff",staffRouter);

app.listen(3000,()=>{
    console.log("server is listing")
})


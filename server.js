const express=require("express");
const app=express();


// const staff=require("./models/staff.js")
const db=require("./db.js")
const staffRouter=require("./routes/staffRouter.js")


//body-parser
app.use(express.json())


// Log every incoming request
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request made to: ${req.originalUrl}`);
    next();
};
app.use(logRequest);

// home api....
app.get('/',(req,res)=>{
    res.send("welcome to our hotel management system")
})

// connect staff router
app.use("/staff",staffRouter);

app.listen(3000,()=>{
    console.log("server is listing")
})


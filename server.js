const db=require("./db.js")
const staff=require("./models/staff.js")

const express=require("express");
const app=express();

app.use(express.json())//body-parser

app.get('/',(req,res)=>{
    res.send("welcome to our hotel management system")
})

//get api staff
app.get("/staff",async(req,res)=>{
    try
    {
        const data=await staff.find();
        console.log("staff data fetch");
        res.status(200).json(data);
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({error:"internal server error"})
    }
})

// parameter api call get api
app.get('/staff/:roleType',async(req,res)=>{
    try
    {
        const roleType=req.params.roleType;
        if(roleType=='Manager' || roleType=='Receptionist' || roleType=='Chef' || roleType=='Waiter')
        {

            const data=await staff.find({role:roleType});
            console.log("data is fetch");
            res.status(200).json(data);
        }
        else
        {
            res.status(404).json({error :'invailid role type'})
        }
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({error :"Internal server error"})
    }
})

// post method
app.post("/staff",async(req,res)=>{
    try
    {
        console.log("Request body:", req.body);
        const data = req.body;
        const newstaff=new staff(data);

        const response=await newstaff.save();
        console.log("data is saved");
        res.status(201).json(response)
    }
    catch(error){
        console.log(error);
        res.status(500).json({error :"Interval servaer error"})
    }
})

app.listen(3000,()=>{
    console.log("server is listing")
})


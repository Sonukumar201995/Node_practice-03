const express=require("express")
const router=express.Router();
const staff=require('../models/staff.js');

const {jwtAuthMiddleware,generateToken}=require("../jwt.js"); //jwt import

router.get("/",async(req,res)=>{
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
router.get('/:roleType',async(req,res)=>{
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
router.post("/",async(req,res)=>{
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
// login router


router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find staff
       const user = await staff.findOne({ username });

        if (!user) {
            return res.status(401).json({
                error: "Invalid username or password"
            });
        }

        // Compare password
        const isPasswordMatch =
            await user.comparePassword(password);

        if (!isPasswordMatch) {
            return res.status(401).json({
                error: "Invalid username or password"
            });
        }

        // Create payload
        const payload = {
            id: user._id,
            username: user.username
        };

        // Generate token
        const token = generateToken(payload);

        console.log("Generated Token:", token);

        return res.status(200).json({
            message: "Login successful",
            token: token
        });

    } catch (error) {
        console.log("Login Error:", error);

        return res.status(500).json({
            error: "Internal server error"
        });
    }
});


// sign up router..
router.post("/signup", async (req, res) => {
    try {
        const data = req.body;

        // Create new staff
        const newStaff = new staff(data);

        // Save data in database
        const response = await newStaff.save();

        console.log("Data saved successfully");

        // Create payload
        const payload = {
            id: response.id,
            username: response.username
        };

        console.log(JSON.stringify(payload));

        // Generate JWT token
        const token = generateToken(payload);

        console.log("Token is:", token);

        // Send response
        res.status(200).json({
            response: response,
            token: token
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Internal server error"
        });
    }
});

// put api

    router.put("/:id",async(req,res)=>{
        try
        {
            const staffId=req.params.id;
            const updateStaff=req.body;

            const response=await staff.findByIdAndUpdate(staffId,updateStaff,
                {
                    new:true,
                    runValidators:true
                }
            )
            if(!response)
            {
                return res.status(404).json({error:'staff data not found'})
            }
            console.log("data updated")
            return res.status(200).json(response);
        }catch(error)
        {
            console.log(error);
            res.status(500).json({error :'internal server error'})
        }
    })


    // delete api
    router.delete('/:id',async(req,res)=>{
        try
        {
            const staffId=req.params.id;
            const response=await staff.findByIdAndDelete(staffId);

            if(!response)
            {
                return res.status(404).json({error:"staff data not found"});
            }
            console.log("data deleted");
            return res.status(200).json({message:"staff data deleted successfullt"})
        }
        catch(error)
        {
            console.log(error);
            res.status(500).json({error:"invterval server error"})
        }
    })

    module.exports=router;
const mongoose=require("mongoose");
const staffSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trime:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    phone:{
        type:String,
        reuired:true
    },
    role: {
        type: String,
        enum: [
            "Manager",
            "Receptionist",
            "Chef",
            "Waiter",
            "Housekeeping",
            "Security"
        ],
        required: true
    },
    salary: {
        type: Number,
        required: true,
        min: 0
    },
    username:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    }

})

module.exports=mongoose.model("staff",staffSchema)
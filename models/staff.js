
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    phone: {
        type: String,
        required: true
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

    username: {
        type: String,
        required: true,
        trim: true
    },

    password: {
        type: String,
        required: true
    }

});


// Password Hashing Middleware

staffSchema.pre("save", async function() {

    // Check whether password is modified

    if (!this.isModified("password")) {
        return;
    }

    // Generate Salt

    const salt = await bcrypt.genSalt(10);

    // Hash Password

    const hashPassword = await bcrypt.hash(
        this.password,
        salt
    );

    // Replace plain password with hashed password

    this.password = hashPassword;

});


// Compare Password Method

staffSchema.methods.comparePassword = async function(candidatePassword) {

    const isMatch = await bcrypt.compare(
        candidatePassword,
        this.password
    );

    return isMatch;

};


// Export Staff Model

module.exports = mongoose.model("Staff", staffSchema);

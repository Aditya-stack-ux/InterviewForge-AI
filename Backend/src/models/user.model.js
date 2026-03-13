const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:[true,"username already taken"]
    },
    email:{
        type:String,
        unique:[true, "account already exist with this email"],
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const usermodel = mongoose.model("User", userSchema)

module.exports = usermodel
const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "must provide name"],
        trim: true,
    },
    email:{
        type:String,
        required:[true, "must provide email"],
        trim: true,
    },
    password:{
        type:String,
        required:[true, "must provide password"],
        
    },
    role:{
        type:String,
        default:"customer"
    },
    date:{
        type:Date,
        default:Date.now()
    },
})

const User = mongoose.model("User", UserSchema)

module.exports = User;